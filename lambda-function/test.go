package main

import (
    "database/sql"
    "fmt"
    "log"
    "os"

    // pgx/stdlib をインポートする
    _ "github.com/jackc/pgx/v5/stdlib"

	"github.com/joho/godotenv"
)

func main() {
    // ダッシュボードからコピーした接続文字列
	err := godotenv.Load()
	if err != nil {
		log.Fatalf(".envファイルの読み込みに失敗しました: %v", err)
	}
    // 例: postgres://postgres:<PASSWORD>@db.<xxxx>.supabase.co:5432/postgres?sslmode=require
    dsn := os.Getenv("DATABASE_URL") // 環境変数から読み込む

    db, err := sql.Open("pgx", dsn)
    if err != nil {
        log.Fatalf("Failed to open database: %v\n", err)
    }
    defer db.Close()

    // 実際にコネクションを張る（Pingで確認）
    if err := db.Ping(); err != nil {
        log.Fatalf("Failed to ping database: %v\n", err)
    }

    fmt.Println("Successfully connected to Supabase PostgreSQL using pgx/stdlib + database/sql")
	userid := "cm3a7ha7i000146hqbelayvxi"
    // -----------------------------
    // テストクエリ（例: テーブル一覧を取得してみる）
    // -----------------------------
    content := "AIが生成したフィードバック本文"

    result, err := db.Exec(`
        UPDATE "Reflection"
        SET "aiFeedback" = $1
        WHERE "reflectionCUID" = $2
    `, content, userid)
	if err != nil {
        log.Fatalf("Failed to execute query: %v\n", err)
    }
	fmt.Println("Result:", result)
    // defer rows.Close()

    // for rows.Next() {
    //     var tableName string
    //     if err := rows.Scan(&tableName); err != nil {
    //         log.Fatalf("Failed to scan row: %v\n", err)
    //     }
    //     fmt.Println("Table name:", tableName)
    // }
    // if err := rows.Err(); err != nil {
    //     log.Fatalf("Row error: %v\n", err)
    // }
}
