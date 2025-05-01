"use client";
import { Box, Typography } from "@mui/material";
import Section from "@/src/app/_client/features/routes/terms/Section";

const TermsPage = () => {
  return (
    <Box my={{ xs: 6, md: 10 }}>
      <Typography component={"h1"} fontSize={"1.5rem"} fontWeight={"bold"}>
        利用規約
      </Typography>
      <Section
        title="第1条（公開投稿の責任）"
        description="本サービスにおいて、利用者が公開した投稿に関しては、公開したのは利用者本人であることを理解し、その投稿に関する一切の責任は利用者本人に帰属します。開発者は、公開された投稿に関する一切の責任を負いません。"
      />
      <Section
        title="第2条（知的財産権等）"
        description={`1. 利用者は、本サービスを利用して投稿および編集する文章、画像等の著作物について、必要な著作権等の知的財産権を自ら有するか、または権利者から適切な許諾を受けていることを確認し、これを本サービスに投稿または編集するものとします。

2. 利用者が本サービスを利用して投稿または編集したコンテンツ（以下「利用者コンテンツ」といいます）に関する著作権は、当該利用者またはその権利者に留保されます。

3. 利用者および第三者は、利用者コンテンツについて、権利者の許可を得ることなく、無断で転載または二次配布等を行うことはできません。

4. 利用者は、運営会社が利用者コンテンツを本サービスのウェブサイトに掲載し、これを配信（公衆送信および送信可能化を含みます）することを許諾するものとします。`}
      />
    </Box>
  );
};

export default TermsPage;
