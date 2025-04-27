import type { Metadata } from "next";
import ImportantPage from "./page.client";
import { meta } from "@/src/app/_client/utils/metadata";

export const metadata: Metadata = meta.importantPage;

const page = () => {
  return <ImportantPage />;
};

export default page;
