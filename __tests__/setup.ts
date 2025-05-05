import { TextEncoder, TextDecoder } from "util";
import fetch, { Response } from "node-fetch";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

global.fetch = fetch as unknown as typeof globalThis.fetch;
global.Response = Response as unknown as typeof globalThis.Response;
