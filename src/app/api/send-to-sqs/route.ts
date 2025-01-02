import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export async function POST(req: NextRequest) {

  const {  content, reflectionCUID } = await req.json();

  const { NEXT_PUBLIC_AWS_REGION, NEXT_PUBLIC_AWS_ACCESS_KEY_ID, NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY, NEXT_PUBLIC_SQS_QUEUE_URL } = process.env;
  if (!NEXT_PUBLIC_AWS_REGION || !NEXT_PUBLIC_AWS_ACCESS_KEY_ID || !NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || !NEXT_PUBLIC_SQS_QUEUE_URL) {
    return new NextResponse("Missing SQS configuration", { status: 500 });
  }

  const sqsClient = new SQSClient({
    region: NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  });

  const messageBody = JSON.stringify({
      content,
      reflectionCUID,
  });

  try {
    const command = new SendMessageCommand({
      QueueUrl: NEXT_PUBLIC_SQS_QUEUE_URL,
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
