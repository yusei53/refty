import opengraphAPI from "@/src/api/opengraph-api";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { reflectionCUID: string };
}) {
  const { reflectionCUID } = params;
  const reflection = await opengraphAPI.getOGPByCUID(reflectionCUID);
  if (reflection === 404) {
    {
      return new ImageResponse(
        (
          <OgImage
            userImage="404"
            title="404 | u-journal"
            username="このページは見つかりません"
          />
        ),
        {
          ...size,
        }
      );
    }
  }

  return new ImageResponse(
    (
      <OgImage
        userImage={reflection.user.image}
        title={reflection.title}
        username={reflection.user.username}
      />
    ),
    {
      ...size,
    }
  );
}

type OgImageProps = {
  userImage: string;
  title: string;
  username: string;
};

const OgImage = ({ userImage, title, username }: OgImageProps) => (
  <div
    style={{
      backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/ogpp.png)`,
      backgroundSize: "100% 100%",
      height: "100%",
      width: "100%",
      display: "flex",
      padding: "0 120px",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <p
      style={{
        fontSize: 50,
        color: "1E1E1E",
        textAlign: "left",
        lineHeight: 1.5,
        fontWeight: "bold",
      }}
    >
      {title}
    </p>
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div
        style={{
          backgroundImage: `url(${userImage})`,
          backgroundSize: "100% 100%",
          height: 60,
          width: 60,
          borderRadius: "50%",
        }}
      ></div>
      <div
        style={{
          fontSize: 38,
          color: "1E1E1E",
          fontWeight: "bold",
        }}
      >
        {username}
      </div>
    </div>
  </div>
);
