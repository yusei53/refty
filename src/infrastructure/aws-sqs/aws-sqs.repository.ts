import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "./aws-sqs.client";

const { NEXT_PUBLIC_SQS_QUEUE_URL } = process.env;
if (!NEXT_PUBLIC_SQS_QUEUE_URL) {
  throw new Error("Missing SQS Queue URL in environment variables");
}

export async function sendMessageToSQS(params: {
  content: string;
  reflectionCUID: string;
}) {
  const { content, reflectionCUID } = params;

  const messageBody = JSON.stringify({ content, reflectionCUID });

  const command = new SendMessageCommand({
    QueueUrl: NEXT_PUBLIC_SQS_QUEUE_URL,
    MessageBody: messageBody
  });

  const responseFromSQS = await sqsClient.send(command);
  return responseFromSQS;
}
