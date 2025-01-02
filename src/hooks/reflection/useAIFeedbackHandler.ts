import { useState, useEffect } from "react";
import { useAIFeedbackWatcher } from "@/src/hooks/reflection/useAIFeedbackWatcher";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";

export const useAIFeedbackHandler = (
  reflectionCUID: string,
  aiFeedback: string,
  content: string,
  onSendToSQS: () => Promise<void>
) => {
  const [animatedFeedback, setAnimatedFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [initialAIFeedback] = useState(aiFeedback);
  const realTimeAIFeedback = useAIFeedbackWatcher(reflectionCUID);
  const plainContent = removeHtmlTags(content);

  // NOTE: 文字数が100文字以上で、AIのフィードバックがない時にAIコールボタンを有効にする
  const isAICallButtonEnabled =
    plainContent.length > 100 && realTimeAIFeedback === null;

  // NOTE: フィードバックを1文字ずつアニメーションさせる関数
  const animateFeedback = (text: string) => {
    setAnimatedFeedback("");
    let index = 0;
    setIsAnimating(true);

    const interval = setInterval(() => {
      if (index < text.length) {
        setAnimatedFeedback((prev) => prev + text[index - 1]);
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 20);
  };

  const handleSendToSQS = async () => {
    setIsLoading(true);
    await onSendToSQS();
  };

  // NOTE:　リアルタイムでAIにFBをもらう時のみ発火される
  useEffect(() => {
    // NOTE: 元からAIのFBがあった時はアニメーションをスキップする
    if (
      realTimeAIFeedback &&
      realTimeAIFeedback !== initialAIFeedback &&
      !isAnimating
    ) {
      setIsLoading(false);
      animateFeedback(realTimeAIFeedback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realTimeAIFeedback]);

  return {
    animatedFeedback,
    isLoading,
    realTimeAIFeedback,
    isAICallButtonEnabled,
    handleSendToSQS
  };
};
