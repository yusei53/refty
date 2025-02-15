import { SQSClient } from "@aws-sdk/client-sqs";

const {
  NEXT_PUBLIC_AWS_REGION,
  NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
} = process.env;

if (!NEXT_PUBLIC_AWS_REGION) {
  throw new Error("Missing AWS_REGION");
}

if (!NEXT_PUBLIC_AWS_ACCESS_KEY_ID) {
  throw new Error("Missing AWS_ACCESS_KEY_ID");
}

if (!NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY) {
  throw new Error("Missing AWS_SECRET_ACCESS_KEY");
}

if (
  !NEXT_PUBLIC_AWS_REGION ||
  !NEXT_PUBLIC_AWS_ACCESS_KEY_ID ||
  !NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
) {
  throw new Error("Missing SQS configuration");
}

export const sqsClient = new SQSClient({
  region: NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
  }
});
