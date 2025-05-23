"use client";
import { Box, Typography } from "@mui/material";
import Section from "@/src/app/_client/features/routes/terms/Section";

const TermsPage = () => {
  return (
    <Box my={{ xs: 6, sm: 10 }} mx={{ xs: 2, sm: 8 }}>
      <Typography component={"h1"} fontSize={"1.5rem"} fontWeight={"bold"}>
        利用規約
      </Typography>
      <Section
        title="第1条（適用）"
        description={`本規約は、本サービスの利用に関して適用され、以下の各条項を含みます。<ol>
<li>本規約は，ユーザーと開発者との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
<li>本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。</li>
<li>本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。</li>
</ol>`}
      />
      <Section
        title="第2条（公開投稿の責任）"
        description="本サービスにおいて、利用者が公開した投稿に関しては、公開したのは利用者本人であることを理解し、その投稿に関する一切の責任は利用者本人に帰属します。開発者は、公開された投稿に関する一切の責任を負いません。"
      />
      <Section
        title="第3条（知的財産権等）"
        description={`本サービスにおけるコンテンツの知的財産権に関する取り決めは、以下の通りです。<ol>
<li>利用者は、本サービスを利用して投稿および編集する文章、画像等の著作物について、必要な著作権等の知的財産権を自ら有するか、または権利者から適切な許諾を受けていることを確認し、これを本サービスに投稿または編集するものとします。</li>
<li>利用者が本サービスを利用して投稿または編集したコンテンツ（以下「利用者コンテンツ」といいます）に関する著作権は、当該利用者またはその権利者に留保されます。</li>
<li>利用者および第三者は、利用者コンテンツについて、権利者の許可を得ることなく、無断で転載または二次配布等を行うことはできません。</li>
<li>利用者は、運営会社が利用者コンテンツを本サービスのウェブサイトに掲載し、これを配信（公衆送信および送信可能化を含みます）することを許諾するものとします。</li>
</ol>`}
      />
      <Section
        title="第4条（禁止事項）"
        description={`ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
<ol>
<li>法令または公序良俗に違反する行為</li>
<li>犯罪行為に関連する行為</li>
<li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li>
<li>開発者，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
<li>本サービスによって得られた情報を商業的に利用する行為</li>
<li>開発者のサービスの運営を妨害するおそれのある行為</li>
<li>不正アクセスをし，またはこれを試みる行為</li>
<li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
<li>不正な目的を持って本サービスを利用する行為</li>
<li>本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為</li>
<li>他のユーザーに成りすます行為</li>
<li>開発者が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為</li>
<li>面識のない異性との出会いを目的とした行為</li>
<li>開発者のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li>
<li>その他，開発者が不適切と判断する行為</li>
</ol>`}
      />
    </Box>
  );
};

export default TermsPage;
