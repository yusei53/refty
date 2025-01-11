import { sendMessageToSQS } from "../infrastructure/aws-sqs/aws-sqs.repository";

export const awsSQSService = {
  async publish(params: { content: string; reflectionCUID: string }) {
    const { content, reflectionCUID } = params;

    if (!content) {
      throw new Error("Content is required");
    }
    if (!reflectionCUID) {
      throw new Error("reflectionCUID is required");
    }

    const responseFromSQS = await sendMessageToSQS({ content, reflectionCUID });

    return {
      success: true,
      messageId: responseFromSQS.MessageId
    };
  }
};
