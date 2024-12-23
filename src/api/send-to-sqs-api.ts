import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

export const SendToSqsAPI = {
  async handleSendToSQS({
      content,
      reflectionCUID,
  }: {
          content: string;
        reflectionCUID: string;
  }): Promise<Result<void, 400 | 401 | 403>> {
    const path = `/api/send-to-sqs`;
    const options: FetchURLOptions = {
      method: "POST",
      body: {
          content,
          reflectionCUID,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await fetchURL<void, 400 | 401 | 403>(path, options);
  },
};
