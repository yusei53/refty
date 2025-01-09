"use client";
import FirstView from "@/src/features/welcome/first-view/FirstView";
import SecondView from "@/src/features/welcome/second-view/SecondView";
import ThirdView from "@/src/features/welcome/third-view/ThirdView";

const WelcomePage = () => {
  return (
    <>
      <FirstView />
      <SecondView />
      <ThirdView />
    </>
  );
};

export default WelcomePage;
