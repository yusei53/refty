import { fetchURL, FetchURLOptions } from "../utils/fetchURL";
import { Result } from "../utils/types/result";

export const SendToSqsAPI = {
  async handleSendToSQS({
    content,
  }: {
    content: string;
  }): Promise<Result<void, 400 | 401 | 403>> {
    const path = `/api/send-to-sqs`;
    const options: FetchURLOptions = {
      method: "POST",
      body: {
        content,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await fetchURL<void, 400 | 401 | 403>(path, options);
  },
};
