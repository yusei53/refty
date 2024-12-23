import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export async function POST(req: NextRequest) {

  const {  content, reflectionCUID } = await req.json();

  // AWS環境変数のチェックなど
  const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SQS_QUEUE_URL } = process.env;
  if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !SQS_QUEUE_URL) {
    return new NextResponse("Missing SQS configuration", { status: 500 });
  }

  // SQSクライアントを作成
  const sqsClient = new SQSClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  // 送信するメッセージBody
  const messageBody = JSON.stringify({
      content,
      reflectionCUID,
  });

  try {
    const command = new SendMessageCommand({
      QueueUrl: SQS_QUEUE_URL,
      MessageBody: messageBody
    });
    const responseFromSQS = await sqsClient.send(command);
    return NextResponse.json(
        {
          success: true,
          messageId: responseFromSQS.MessageId,
        },
        { status: 200 }
      );
  } catch (error) {
    console.error("Error sending to SQS:", error);
    return new NextResponse("Error sending to SQS:", { status: 500 });
  }
}
