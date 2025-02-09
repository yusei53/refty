"use client";
import { useState, useEffect } from "react";

const AddToHomeScreenButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // beforeinstallprompt イベントをキャッチして保存する
    const handler = (e: Event) => {
      e.preventDefault(); // ブラウザが自動的にプロンプトを表示しないようにする
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // アプリがインストールされたらイベントをクリア
    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    // ユーザーのアクションでプロンプトを表示する
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (deferredPrompt as any).prompt();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (deferredPrompt as any).userChoice.then(
      (choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      }
    );
  };

  // すでにインストール済みの場合やプロンプトが利用できない場合はボタンを表示しない
  if (isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      style={{ padding: "10px 20px", fontSize: "16px" }}
    >
      ホーム画面に追加
    </button>
  );
};

export default AddToHomeScreenButton;
