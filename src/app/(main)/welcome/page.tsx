import type { Metadata } from "next";
import FirstView from "@/src/components/welcome/first-view/FirstView";
import SecondView from "@/src/components/welcome/second-view/SecondView";
import ThirdView from "@/src/components/welcome/third-view/ThirdView";
import { meta } from "@/src/utils/metadata/metadata";

export const metadata: Metadata = meta.welcomePage;

const page = () => {
  return (
    <>
      <FirstView />
      <SecondView />
      <ThirdView />
    </>
  );
};

export default page;
