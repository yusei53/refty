import { useState, useEffect } from "react";
import supabase from "@/src/lib/supabase";

type AiFeedback = {
  aiFeedback: string;
};

export const useAIFeedbackWatcher = (reflectionCUID: string) => {
  const [AIFeedback, setAIFeedback] = useState<string>();

  const fetchAIFeedback = async () => {
    const { data, error } = await supabase
      .from("Reflection")
      .select("aiFeedback")
      .eq("reflectionCUID", reflectionCUID)
      .single();

    if (error) {
      console.error("fetchでエラーが発生しました", error);
    } else {
      setAIFeedback(data.aiFeedback);
    }
  };

  // NOTE: reflectionCUIDが一致するレコードを監視そ、updateがあったらaiFeedbackのstateを更新する
  const subscribeToRealtimeUpdateAIFeedback = () => {
    const channel = supabase
      .channel("realtime:AIFeedback")
      .on<AiFeedback>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Reflection",
          filter: `reflectionCUID=eq.${reflectionCUID}`
        },
        (payload) => {
          if (payload.new && payload.new.aiFeedback) {
            setAIFeedback(payload.new.aiFeedback);
          }
        }
      )
      .subscribe();

    return channel;
  };

  useEffect(() => {
    fetchAIFeedback();
    const channel = subscribeToRealtimeUpdateAIFeedback();
    // NOTE: コンポーネントがアンマウントされたら監視を解除する
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return AIFeedback;
};
