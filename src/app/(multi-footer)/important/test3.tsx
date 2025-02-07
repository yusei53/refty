import EffectSection from "./test2";

const SecondView = () => {
  return (
    <>
      <EffectSection
        image={"/lp/welcome-1.png"}
        title={`振り返りによって\n日々のパフォーマンスを最大化`}
        description={
          "ハーバード大学の研究によると、振り返りを行うことで業務パフォーマンスが23.2%向上することが明らかになっています。また、多くの先行研究が、精神的報酬や学習習慣の向上に大きく寄与することを示しています。\n\nリフティは、日々の振り返りや、自分の気持ちを素直に綴ることで、心の整理や成長をサポートするアプリです。どんな小さな気づきや感情でも大切に記録し、自分らしさを発見するお手伝いをします。"
        }
      />
      <EffectSection
        image={"/lp/welcome-2.png"}
        title={`成功体験の振り返りが\n未来の自分の自信や努力量に`}
        description={
          "日本人は成功体験を振り返る機会が少ない傾向にあると言われています。\n\nしかし、成功体験を振り返ることで得られる精神的報酬は大きく、モチベーションの源泉となることが研究で明らかになっています。成功体験の振り返りは、学業成績やキャリアの成功、自信や努力量の向上に寄与します。\n\n一方、失敗体験の振り返りも重要です。失敗から学び、次の行動を改善することで、学習習慣や物事の取り組み方に良い影響を与えます。"
        }
        isEvenNumber
      />
      <EffectSection
        image={"/lp/welcome-3.png"}
        title={`他者と共有し\n自分の視野と学びを広げる`}
        description={
          "振り返りは、他者と共有することで自分の視野や学びを広げる効果があることが、ハーバード大学の研究で明らかになっています。誰かに見られる可能性を意識することで、考えを整理し、言語化する力も高まります。\n\nさらに、共有しなくても他者の振り返りを参考にすることで、新たな視点やアイデアを得ることができます。他の人がどのように考え、振り返っているかを知ることで、自分の視野が広がり、考え方に多様性をもたらします。"
        }
        isShareSection
      />
    </>
  );
};

export default SecondView;
