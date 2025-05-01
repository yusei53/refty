import type { Metadata } from "next";
import TermsPage from "./page.client";
import { meta } from "@/src/app/_client/utils/metadata";

export const metadata: Metadata = meta.termsPage;

const page = () => {
  return <TermsPage />;
};

export default page;
