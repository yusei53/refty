package main

import (
	"context"
	"database/sql"
	"log"
	"os"
	"path"
	"strings"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/joho/godotenv"
	storage_go "github.com/supabase-community/storage-go"
	//"github.com/aws/aws-lambda-go/lambda"
)

// NOTE: 現在の環境を判定する変数
var isDevelopment bool

func init() {
	isDevelopment = true
}

func main() {
	// NOTE: .envファイルの読み込み
	err := godotenv.Load()
	if err != nil {
		log.Fatalf(".envファイルの読み込みに失敗しました: %v", err)
	}

	if isDevelopment {
		log.Println("ローカル環境で実行します。")
		handler(context.Background())
	} else {
		log.Println("AWS Lambda環境で実行します。")
		// lambda.Start(handler)
	}
}

func handler(ctx context.Context) {
	log.Println("処理開始")

	// NOTE: 環境変数の取得
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Println("Missing DATABASE_URL environment variable")
		return
	}
	
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_SERVICE_KEY")
	if supabaseURL == "" || supabaseKey == "" {
		log.Fatalln("SUPABASE_URL or SUPABASE_SERVICE_KEY environment variable is missing")
	}

	// NOTE: データベースへの接続設定
	db, err := sql.Open("pgx", dsn)
	defer db.Close()
	if err != nil {
		log.Fatalf("データベース接続に失敗しました: %v\n", err)
	}

	// NOTE: データベース接続確認 (Ping)
	err = db.Ping()
	if err != nil {
		log.Fatalf("データベースへのPingに失敗しました: %v\n", err)
	}
	log.Println("データベース接続成功")


	// NOTE: Supabase Storageクライアントの初期化
	storageClient := storage_go.NewClient(supabaseURL+"/storage/v1", supabaseKey, nil)
	log.Println("Supabase Storageクライアント初期化完了")


	// NOTE: DBから全てのReflectionImageレコードを取得
	imageRows, err := db.Query(`
		SELECT "id", "reflectionCUID", "imageUrl", "orderIndex", "createdAt"
		FROM "ReflectionImage" 
		ORDER BY "createdAt" DESC
	`)
	if err != nil {
		log.Fatalf("ReflectionImageレコードのクエリ実行に失敗しました: %v\n", err)
	}
	defer imageRows.Close()

	// NOTE: DBレコードからファイル名を抽出
	log.Println("=== DB内のファイル名一覧 ===")
	var dbFilenames []string
	for imageRows.Next() {
		var (
			id             string
			reflectionCUID string
			imageURL       string
			orderIndex     int
			createdAt      time.Time
		)
		if err := imageRows.Scan(&id, &reflectionCUID, &imageURL, &orderIndex, &createdAt); err != nil {
			log.Printf("ReflectionImageレコードのスキャンに失敗しました: %v\n", err)
			continue // エラーが発生した行はスキップして処理を続行
		}
		// NOTE: ImageURLからファイル名を抽出 (例: "https://.../filename.jpg" -> "filename.jpg")
		parts := strings.Split(imageURL, "/")
		if len(parts) > 0 {
			fileName := parts[len(parts)-1]
			dbFilenames = append(dbFilenames, fileName)
			log.Println(fileName)
		}
	}
	if err = imageRows.Err(); err != nil {
		log.Fatalf("imageRowsの処理中にエラーが発生しました: %v", err)
	}

	// NOTE: Supabase Storageからファイル一覧を取得
	bucketName := "refty-storage"
	reflectionImagesPath := "reflection-images" 
	log.Printf("=== Supabase Storage ファイル一覧 (%s/%s) ===", bucketName, reflectionImagesPath)
	
	// NOTE: ListFilesのオプション設定
	options := storage_go.FileSearchOptions{ Limit: 0, Offset: 0 } 

	storageFiles, err := storageClient.ListFiles(bucketName, reflectionImagesPath, options)
	if err != nil {
		log.Fatalf("Supabase Storageからのファイル一覧取得に失敗しました: %v\n", err)
	}

	// NOTE: Storageオブジェクトからファイル名を抽出
	log.Println("=== Storage内のファイル名一覧 ===")
	var storageFilenames []string
	if len(storageFiles) == 0 {
		log.Println("Supabase Storageの指定パスにファイルは見つかりませんでした。")
	}
	for _, file := range storageFiles {
		storageFilenames = append(storageFilenames, file.Name)
		log.Println(file.Name)
	}

	// NOTE: DBファイル名をマップに変換して検索効率を向上
	dbFilenamesMap := make(map[string]bool)
	for _, name := range dbFilenames {
		dbFilenamesMap[name] = true
	}

	// NOTE: Storageにのみ存在しDBに存在しないファイル（削除候補）を特定
	filesToDelete := []string{} 
	log.Println("=== Storageにのみ存在するファイル（削除候補） ===")
	for _, storageName := range storageFilenames {
		if _, existsInDB := dbFilenamesMap[storageName]; !existsInDB {
			filesToDelete = append(filesToDelete, storageName)
			log.Println(storageName)
		}
	}

	// NOTE: 削除対象ファイルの処理
	if len(filesToDelete) > 0 {
		log.Printf("%d 個の削除対象ファイルが見つかりました。削除処理を開始します...", len(filesToDelete))
		
		// NOTE: 削除用ファイルパスの準備 (Storageのルートからのフルパス)
		fullPathFilesToDelete := make([]string, len(filesToDelete))
		for i, fileName := range filesToDelete {
			fullPathFilesToDelete[i] = path.Join(reflectionImagesPath, fileName) // path.Joinで結合
		}

		// NOTE: Supabase Storageからファイルを削除
		removedFiles, err := storageClient.RemoveFile(bucketName, fullPathFilesToDelete)
		if err != nil {
			log.Printf("Supabase Storageからのファイル削除に失敗しました: %v\n", err)
		} else {
			if len(removedFiles) > 0 {
				log.Printf("%d 個のファイルがSupabase Storageから正常に削除されました:\n", len(removedFiles))
				for i := range removedFiles {
					log.Printf("- 削除されたファイル: %s\n", filesToDelete[i])
				}
			} else {
				log.Println("実際には削除されたファイルはありませんでした。RemoveFileは成功しましたが、対象が見つからなかったか、既に削除されていた可能性があります。")
			}
		}
	} else {
		log.Println("削除対象のファイルはありませんでした。")
	}

	log.Println("処理が完了しました。")
}
