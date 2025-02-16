import { sendMessageToSQS } from "../infrastructure/aws-sqs/aws-sqs.repository";

export const awsSQSService = {
  async publish(params: {
    content: string;
    reflectionCUID: string;
    AIType: 0 | 1 | 2 | 3;
  }) {
    const { content, reflectionCUID, AIType } = params;

    if (!content) {
      throw new Error("Content is required");
    }
    if (!reflectionCUID) {
      throw new Error("reflectionCUID is required");
    }
    if (!AIType) {
      throw new Error("AIType is required");
    }

    const responseFromSQS = await sendMessageToSQS({
      content,
      reflectionCUID,
      AIType
    });

    return {
      success: true,
      messageId: responseFromSQS.MessageId
    };
  }
};
