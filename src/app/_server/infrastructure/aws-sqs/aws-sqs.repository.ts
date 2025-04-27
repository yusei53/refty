import { SendMessageCommand } from "@aws-sdk/client-sqs";
import type { AIFeedbackType } from "@/src/app/_client/api/send-to-sqs-api";
import { sqsClient } from "./aws-sqs.client";

const { NEXT_PUBLIC_SQS_QUEUE_URL } = process.env;
if (!NEXT_PUBLIC_SQS_QUEUE_URL) {
  throw new Error("Missing SQS Queue URL in environment variables");
}

export const sendMessageToSQS = async (params: {
  content: string;
  reflectionCUID: string;
  AIType: AIFeedbackType;
}) => {
  const { content, reflectionCUID, AIType } = params;

  const messageBody = JSON.stringify({ content, reflectionCUID, AIType });

  const command = new SendMessageCommand({
    QueueUrl: NEXT_PUBLIC_SQS_QUEUE_URL,
    MessageBody: messageBody
  });

  const responseFromSQS = await sqsClient.send(command);
  return responseFromSQS;
};
