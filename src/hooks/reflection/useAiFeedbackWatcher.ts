import { useState, useEffect } from "react";
import supabase from "@/src/lib/supabase";

type AiFeedback = {
  aiFeedback: string;
};

export const useAiFeedbackWatcher = (reflectionCUID: string) => {
  const [aiFeedback, setAiFeedback] = useState<string>("まじで出ろ");

  const fetchAiFeedback = async () => {
    const { data, error } = await supabase
      .from("Reflection")
      .select("aiFeedback")
      .eq("reflectionCUID", reflectionCUID)
      .single();

    if (error) {
      console.error("Error fetching comments", error);
    } else {
      setAiFeedback(data.aiFeedback || aiFeedback);
    }
  };

  // NOTE: reflectionCUIDが一致するレコードを監視そ、updateがあったらaiFeedbackのstateを更新する
  const subscribeToRealtimeUpdateAiFeedback = () => {
    const channel = supabase
      .channel("realtime:ai")
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
            setAiFeedback(payload.new.aiFeedback);
          }
        }
      )
      .subscribe();

    return channel;
  };

  useEffect(() => {
    fetchAiFeedback();
    const channel = subscribeToRealtimeUpdateAiFeedback();
    // NOTE: コンポーネントがアンマウントされたら監視を解除する
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return aiFeedback;
};
