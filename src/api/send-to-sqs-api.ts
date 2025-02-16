import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

export const sqsAPI = {
  async sendToSQS({
    content,
    reflectionCUID,
    AIType
  }: {
    content: string;
    reflectionCUID: string;
    AIType: 0 | 1 | 2 | 3;
  }): Promise<Result<void, 401 | 403 | 500>> {
    const path = `/api/send-to-sqs`;
    const options: FetchURLOptions = {
      method: "POST",
      body: {
        content,
        reflectionCUID,
        AIType
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<void, 401 | 403 | 500>(path, options);
  }
};
