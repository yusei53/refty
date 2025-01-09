"use client";
import FirstView from "@/src/features/routes/welcome/first-view/FirstView";
import SecondView from "@/src/features/routes/welcome/second-view/SecondView";
import ThirdView from "@/src/features/routes/welcome/third-view/ThirdView";

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
