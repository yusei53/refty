export const REFLECTION_TEMPLATES = {
  GKPT: [
    { title: "Good", description: "良かったことを思いつく限り書きましょう" },
    { title: "Keep", description: "Goodの中で続けるべきことを書きましょう" },
    {
      title: "Problem",
      description: "良くなかったことを思いつく限り書きましょう",
    },
    { title: "Try", description: "Problemについて改善方法を書きましょう" },
  ],
  developerReflection: [
    {
      title: "やったこと",
      description: "やったことを思いつく限り書きましょう",
    },
    {
      title: "良かったこと",
      description: "良かったことを思いつく限り書きましょう",
    },
    {
      title: "悪かったこと",
      description: "良くなかったことを思いつく限り書きましょう",
    },
    {
      title: "再発防止策",
      description: "悪かったことの改善方法を書きましょう",
    },
  ],
  funDoneLearn: [
    {
      title: "Fun",
      description: "楽しかったことを思いつく限り書きましょう",
    },
    {
      title: "Done",
      description: "完了したことを思いつく限り書きましょう",
    },
    {
      title: "Learn",
      description: "学んだことを思いつく限り書きましょう",
    },
  ],
  fromResPectedSeniors: [
    {
      title: "今回自分に点数つけたら何点？",
      description: "正直に書きましょう",
    },
    {
      title: "なんでその点数なの？",
      description: "正直に書きましょう",
    },
    {
      title: "NextAction何する？",
      description: "正直に書きましょう",
    },
  ],
  openAirBath: [
    {
      title: "風呂",
      description: "心や体が温まった出来事を書きましょう",
    },
    {
      title: "絶景",
      description: "未来に目指したい・行きたい場所を書きましょう",
    },
    {
      title: "湯けむり",
      description:
        "心に残っている曖昧だけど暖かい記憶や、なぜか記憶に残っている出来事を書きましょう",
    },
  ],
  threeLittlePigs: [
    {
      title: "レンガの家",
      description: "私たちの活動の中でゆるぎのないもの",
    },
    {
      title: "木の家",
      description: "かなり堅実だが、まだ改善の余地があるもの",
    },
    {
      title: "わらの家",
      description: "ギリギリ持ち堪えているが、いつ崩れてもおかしいもの",
    },
  ],
  starfish: [
    {
      title: "Keep",
      description: "続けることを書きましょう",
    },
    {
      title: "Less of",
      description: "減らすことを書きましょう",
    },
    {
      title: "Stop",
      description: "止めるものを書きましょう",
    },
    {
      title: "More of",
      description: "増やすことを書きましょう",
    },
    {
      title: "Start",
      description: "始めることを書きましょう",
    },
  ],
  fiveWhy: [
    {
      title: "物事の要因を一段階ずつ掘り下げる出来事",
      description:
        "成功、失敗、原因不明、どんな出来事でもOKです。一つ選んでください",
    },
    {
      title: "1つ目のWhy",
      description:
        "なぜその背景、要因、出来事、状況があったのか？最初の要因を考える",
    },
    {
      title: "2つ目のWhy",
      description: "なぜその背景、要因、出来事、状況があったのか？視野を広げる",
    },
    {
      title: "3つ目のWhy",
      description:
        "なぜその背景、要因、出来事、状況があったのか？さらに掘り下げる",
    },
    {
      title: "4つ目のWhy",
      description:
        "なぜその背景、要因、出来事、状況があったのか？さらに深く掘り下げる",
    },
    {
      title: "5つ目のWhy",
      description:
        "なぜその背景、要因、出来事、状況があったのか？最終的な答えが出なくても良い",
    },
  ],
  positiveAlien: [
    {
      title: "お祝い",
      description: "最近何を行った？何を学んだ？",
    },
    {
      title: "成功の種",
      description:
        "失敗やミスがあったか？そこから学んだことはあるか？成功の始まり！",
    },
    {
      title: "どの種を育てる？どんなふうに？",
      description: "成功の種を育てるために何をする？",
    },
  ],
  footprints: [
    {
      title: "自分の強み",
      description: "あなたの強みを書きましょう",
    },
    {
      title: "自分の弱み",
      description: "あなたの弱みを書きましょう",
    },
    {
      title: "自分の脅威",
      description: "あなたの脅威を書きましょう",
    },
    {
      title: "未来の自分へ",
      description: "未来の自分へのメッセージを書きましょう",
    },
  ],
} as const;

export type ReflectionTemplateType = typeof REFLECTION_TEMPLATES;

const reflectionTemplateName: Record<keyof ReflectionTemplateType, string> = {
  GKPT: "GKPT",
  developerReflection: "開発者が使う振り返り手法",
  funDoneLearn: "Fun・Done・Learn",
  fromResPectedSeniors: "あなたの一番尊敬する先輩から",
  openAirBath: "露天風呂",
  threeLittlePigs: "三匹の子豚",
  starfish: "Starfish",
  fiveWhy: "5つのなぜ",
  positiveAlien: "ポジティブ星人",
  footprints: "足跡",
};

export const getReflectionTemplateName = (
  key: keyof ReflectionTemplateType
): string => {
  return reflectionTemplateName[key];
};

/*
ReflectionTemplateTypeは以下のような解釈でもOK(一番はhoverで確認すること)

type ReflectionTemplateType = {
  GKPT: { title: string; description: string }[];
  DeveloperReflection: { title: string; description: string }[];
};
*/
