import { ImageResponse } from "next/og";
import opengraphAPI from "@/src/api/opengraph-api";

export const size = {
  width: 100,
  height: 100
};
export const contentType = "image/png";

export default async function Image({
  params
}: {
  params: { username: string };
}) {
  const { username } = params;
  const userInformation = await opengraphAPI.getOGPByUsername(username);

  if (userInformation === 404) {
    {
      // TODO: 存在しないユーザーのOGP画像を返す
      return new ImageResponse(<OgImage userImage={""} />, {
        ...size
      });
    }
  }

  return new ImageResponse(<OgImage userImage={userInformation.user.image} />, {
    ...size
  });
}

type OgImageProps = {
  userImage: string;
};

const OgImage = ({ userImage }: OgImageProps) => (
  <div
    style={{
      backgroundImage: `url(${userImage})`,
      backgroundSize: "100% 100%",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}
  />
);
