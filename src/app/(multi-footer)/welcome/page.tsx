import type { Metadata } from "next";
import WelcomePage from "./page.client";
import { meta } from "@/src/app/_client/utils/metadata";

export const metadata: Metadata = meta.welcomePage;

const page = () => {
  return <WelcomePage />;
};

export default page;
