import FirstView from "@/src/components/welcome/first-view/FirstView";
import SecondView from "@/src/components/welcome/second-view/SecondView";
import { Metadata } from "next";

const description = "日々の振り返りを手助けする振り返りプラットフォーム";
export const metadata: Metadata = {
  title: "リフティとは",
  description: description,
  openGraph: {
    type: "website",
    url: "https://www.refty.jp/welcome",
    title: "リフティとは | リフティ",
    description: description,
  },
  twitter: {
    title: "リフティとは | リフティ",
    description: description,
  },
};

const page = () => {
  return (
    <>
      <FirstView />
      <SecondView />
    </>
  );
};

export default page;
