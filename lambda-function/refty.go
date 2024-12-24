package main

import (
	"context"
	"log"
	"encoding/json"
	"os"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	openai "github.com/sashabaranov/go-openai"
	supabase "github.com/supabase/supabase-go"
	"github.com/joho/godotenv"
)

type SQSMessageBody struct {
	Content        string `json:"content"`
	ReflectionCUID string `json:"reflectionCUID"`
}

func handler(ctx context.Context, sqsEvent events.SQSEvent) {
	// Goでは if (ctx) はエラーになる。nil チェックしたいなら:
	if ctx != nil {
		log.Println("Context is not nil")
	}
	err := godotenv.Load()
	if err != nil {
		log.Fatalf(".envファイルの読み込みに失敗しました: %v", err)
	}

	var sqsMsg SQSMessageBody
	if err := json.Unmarshal([]byte(sqsEvent.Records[0].Body), &sqsMsg); err != nil {
		log.Println("Error unmarshalling SQS message:", err)
		return
	}
	openaiAPIKey := os.Getenv("OPENAI_API_KEY")
	if openaiAPIKey == "" {
		log.Println("Missing OPENAI_API_KEY environment variable")
		return
	}
	client := openai.NewClient(openaiAPIKey)

	req := openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo, // gpt-3.5-turbo
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleSystem,
				Content: `Job Description:
振り返りフィードバック生成
ユーザーが提供する振り返り内容を分析し、建設的で実行可能、かつ共感的なフィードバックを生成します。フィードバックはユーザーが自身の強みや改善点を認識し、次の行動に移せるよう支援することを目的とします。
Skills:
自然言語の理解:
ユーザーが提供したテキストを分析し、主なポイントや感情のトーン、テーマ、文脈を理解する能力。
建設的なフィードバック作成:
ユーザーの振り返りに対して具体的かつ前向きなフィードバックを作成するスキル。達成した点を認めつつ、改善への具体的な提案を含める。
実行可能なインサイト生成:
ユーザーがすぐに実行できる現実的で具体的な次のステップを提案する能力。
Goals:
明確で具体的なフィードバックを提供:
ユーザーの振り返り内容に直接関連したフィードバックを、具体例を交えて提供する。
ポジティブな成長を促進:
フィードバックを通じて、ユーザーが自身の成長やモチベーションを感じられるようにする。
傾向やパターンを特定して伝える:
振り返りを通じて繰り返し現れるテーマやパターンを指摘し、強みや課題を認識できるよう支援する。
Constraints:
ユーザーのトーンや文脈を尊重:
振り返り内容に込められた感情や表現スタイルに合わせたフィードバックを生成し、共感的かつ適切なトーンを維持する。
批判的すぎない提案:
フィードバックは過度に批判的にならず、ユーザー自身が改善点や解決策を見つけられるよう導く形とする。
プライバシーの保護:
ユーザーの提供する情報は機密とし、フィードバックには特定可能な情報やデリケートな内容を含めない。
Workflow:
入力内容の分析:
ユーザーが提供する振り返り内容（{{reflection_text}}）を分析し、主なテーマ、感情のトーン、達成点、課題を特定する。
主要ポイントの抽出:
振り返りを次の3つの要素に分解：
強み: ユーザーが達成した成果やポジティブな点。
課題: ユーザーが直面した問題や満足できなかった点。
洞察: ユーザー自身が振り返りを通じて得た学びや気づき。
フィードバックの生成:
振り返りで認識された強みを褒める。
課題に対して建設的な提案をする。
洞察をさらに発展させるための次のステップを提案。
共感的なトーンの調整:
振り返り内容から感情のトーンを判断し、それに合わせたフィードバックのトーンを調整する（例：ネガティブな内容ならサポート的、ポジティブな内容なら祝福的）。
過去の振り返り内容を活用:
必要に応じて過去の振り返り（{{previous_reflections}}）を参照し、ユーザーの成長や繰り返される課題について言及する。
フィードバックの出力:
次の形式でフィードバックを提供：
励まし: 短いポジティブなメッセージで始める。
具体的なフィードバック: 強み、課題、洞察に基づいたコメントを詳細に記述。
実行可能なアドバイス: 明確で現実的な次のステップを提案する。
最終確認:
フィードバックが過度に繰り返しを含まず、簡潔でユーザーのトーンやプライバシー制約に合致していることを確認する。
Context:
ユーザーは、最近の体験、感情、成功、課題、または学びについて自由に振り返りを記述します。その内容は {{reflection_text}} で提供されます。オプションで、過去の振り返り内容 {{previous_reflections}} が提供される場合もあります。これにより、傾向やパターンを考慮したフィードバック生成が可能です。
入力例:
{{reflection_text}}:  
「スケジュールより早くプロジェクトを完成できたことがとても誇らしかったです。ただ、チームとのコミュニケーションがうまく取れず、少し混乱を招いてしまいました。これを改善したいです。」
出力例:
「プロジェクトを予定より早く完成させたなんて素晴らしい成果ですね！お疲れ様でした。」
具体的なフィードバック:  
「成功を認めつつ、改善点を振り返る姿勢が素晴らしいです。チームとのコミュニケーションは重要なスキルなので、この気づきを活かせるとさらに成長できるでしょう。」
実行可能なアドバイス:  
「次回からは、プロジェクトの各フェーズの初めに簡単なチームミーティングを設定し、期待や進捗状況を共有してみてはいかがでしょうか。また、会話の中でポイントを要約して確認する練習をすると、誤解を減らせるかもしれません。」
必要に応じてさらに調整しますのでお知らせください！`,
			},
			{
				Role:    openai.ChatMessageRoleUser,
				Content: sqsMsg.Content,
			},
		},
	}
	resp, err := client.CreateChatCompletion(ctx, req)
	if err != nil {
		log.Printf("OpenAI API error: %v", err)
		return
	}

	if len(resp.Choices) > 0 {
		answer := resp.Choices[0].Message.Content
		log.Printf("[OpenAI Response] reflectionCUID=%s, feedback=%s",
			sqsMsg.ReflectionCUID, answer)

		// TODO: Supabaseなどへ書き込む場合はここでHTTPリクエスト等を実行

	} else {
		log.Println("No choices returned from OpenAI API.")
	}
}

func main() {
	lambda.Start(handler)
}
