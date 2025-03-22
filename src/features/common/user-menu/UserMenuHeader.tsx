import Image from "next/image";
import { Box, Fade, Popper } from "@mui/material";
import type { User } from "@prisma/client";
import { UserMenuButton } from "./UserMenuButton";
import { Button } from "@/src/components/button";

type UserMenuHeaderProps = {
  username: User["username"];
  userImage: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onOpenPopup: (event: React.MouseEvent<HTMLElement>) => void;
  onClosePopup: () => void;
};

export const UserMenuHeader: React.FC<UserMenuHeaderProps> = ({
  username,
  userImage,
  anchorEl,
  open,
  onOpenPopup,
  onClosePopup
}) => {
  return (
    <>
      <Box
        component={"header"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1.5}
        position={"absolute"}
        top={27}
        right={27}
      >
        <Button href={`/post`} sx={button}>
          <Image
            src={"/edit.svg"}
            alt={"編集するボタン"}
            width={17}
            height={17}
          />
          投稿する
        </Button>
        {/* NOTE: buttonコンポーネントで囲わないとonBlurが効かない */}
        <Box
          component={"button"}
          type={"button"}
          onClick={onOpenPopup}
          onBlur={onClosePopup}
          sx={icon}
        >
          <Image
            src={userImage}
            alt={`${username}の画像`}
            width={40}
            height={40}
            priority
            style={{
              borderRadius: "50%"
            }}
          />
        </Box>
      </Box>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement={"bottom-end"}
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 5]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={0}>
            <Box
              width={190}
              borderRadius={2.5}
              bgcolor={"white"}
              py={1}
              boxShadow={1}
              onMouseDown={(e) => {
                // NOTE: onBlurを有効にするため
                e.preventDefault();
              }}
            >
              <UserMenuButton
                title={"みんなの振り返り"}
                src={"/home.svg"}
                alt={`みんなの振り返り`}
                href={`/`}
              />
              <UserMenuButton
                title={"マイページ"}
                src={"/user.svg"}
                alt={`マイページ`}
                href={`/${username}`}
              />
              <UserMenuButton
                title={"マイレポート"}
                src={"/report.svg"}
                alt={`マイレポート`}
                href={`/${username}/report`}
              />
              <UserMenuButton
                title={"プロフィール設定"}
                src={"/setting.svg"}
                alt={`プロフィール設定`}
                href={`/${username}/profile-setting`}
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

// TODO: 内製化したい
const button = {
  fontSize: 14,
  p: "6px 12px",
  letterSpacing: 0.8,
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};

// NOTE: ユーザーアイコンを囲むボタンのスタイル
const icon = {
  border: "none",
  bgcolor: "transparent",
  borderRadius: 50,
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};
