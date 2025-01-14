package main

import (
	"context"
	"log"
	"encoding/json"
	"os"
	"database/sql"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	openai "github.com/sashabaranov/go-openai"
	// "github.com/joho/godotenv"
	_ "github.com/jackc/pgx/v5/stdlib"
	// "refty.go/content"
)

type SQSMessageBody struct {
	Content        string `json:"content"`
	ReflectionCUID string `json:"reflectionCUID"`
}

func handler(ctx context.Context, sqsEvent events.SQSEvent) {
	
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatalf(".envファイルの読み込みに失敗しました: %v", err)
	// }
	// hello
	// world
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Println("Missing DATABASE_URL environment variable")
		return
	}
	openaiAPIKey := os.Getenv("OPENAI_API_KEY")
	if openaiAPIKey == "" {
		log.Println("Missing OPENAI_API_KEY environment variable")
		return
	}
	
	db, err := sql.Open("pgx", dsn)
	defer db.Close()
	if err != nil {
		log.Fatalf("Failed to open database: %v\n", err)
	}
	

	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v\n", err)
	}
	var sqsMsg SQSMessageBody
	if err := json.Unmarshal([]byte(sqsEvent.Records[0].Body), &sqsMsg); err != nil {
		log.Println("Error unmarshalling SQS message:", err)
		return
	}
	client := openai.NewClient(openaiAPIKey)

	req := openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleSystem,
				// Content: content.FeedbackQuery,
        Content: FeedbackQuery,
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

		result, err := db.Exec(`
        UPDATE "Reflection"
        SET "aiFeedback" = $1
        WHERE "reflectionCUID" = $2
    `, answer, sqsMsg.ReflectionCUID)
	log.Println("success Result:", result)
	if err != nil {
        log.Fatalf("Failed to execute query: %v\n", err)
    }
	} else {
		log.Println("No choices returned from OpenAI API.")
	}
}

func main() {
	lambda.Start(handler)
}
