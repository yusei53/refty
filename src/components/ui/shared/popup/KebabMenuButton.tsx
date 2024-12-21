import { useState } from "react";
import Image from "next/image";
import type { SxProps } from "@mui/material";
import { Box, Fade, Popper } from "@mui/material";
import { red } from "@mui/material/colors";
import { Button } from "../button";
import { DeleteConfirmationModal } from "@/src/components/reflection-list/modal/DeleteConfirmationModal";
import { theme } from "@/src/utils/theme";

type KebabMenuButtonProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onUpdatePinned: () => void;
  sx?: SxProps;
  reflectionCUID: string;
  username: string;
  isPinned: boolean;
};

// MEMO: 今Card側にロジック書いてしまっているけど、Popup側にロジックを書くべきかも(Container層とかに分けるべき)
export const KebabMenuButton: React.FC<KebabMenuButtonProps> = ({
  anchorEl,
  open,
  onClick,
  onClose,
  onUpdatePinned,
  username,
  reflectionCUID,
  sx,
  isPinned
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModalToggle = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleCopyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_API_URL}/${username}/${reflectionCUID}`;
    navigator.clipboard.writeText(link);
    onClose();
  };

  const handlePinToggle = () => {
    onUpdatePinned();
    onClose();
  };

  return (
    <>
      <Box
        component={"button"}
        type={"button"}
        bgcolor={"transparent"}
        border={"none"}
        borderRadius={50}
        width={30}
        height={30}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={onClick}
        onBlur={onClose}
        sx={{
          cursor: "pointer",
          ...sx,
          "&:hover": {
            bgcolor: `${theme.palette.primary.contrastText}`
          }
        }}
      >
        <Image
          src={"/kebab-menu.svg"}
          alt={"ケバブボタン"}
          width={22}
          height={22}
        />
      </Box>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement={"bottom-end"}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box boxShadow={1} borderRadius={2.5} bgcolor={"white"}>
              {/* // TODO: ボタンを共通コンポーネント化する */}
              <Button
                onClick={handleCopyLink}
                sx={{
                  border: "none",
                  display: "block",
                  textAlign: "left",
                  borderRadius: "none",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.contrastText
                  }
                }}
              >
                <Box display={"flex"} alignItems={"center"} letterSpacing={0.5}>
                  <Image
                    src={"/share.svg"}
                    alt={`リンクをコピーするボタン`}
                    width={18}
                    height={18}
                    style={{ marginRight: 10 }}
                  />
                  リンクをコピーする
                </Box>
              </Button>
              <Button
                href={`/${username}/${reflectionCUID}/edit`}
                sx={{
                  border: "none",
                  display: "block",
                  textAlign: "left",
                  borderRadius: "none",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.contrastText
                  }
                }}
              >
                <Box display={"flex"} alignItems={"center"} letterSpacing={0.5}>
                  <Image
                    src={"/edit.svg"}
                    alt={`編集するボタン`}
                    width={18}
                    height={18}
                    style={{ marginRight: 10 }}
                  />
                  編集する
                </Box>
              </Button>
              <Button
                onClick={handlePinToggle}
                sx={{
                  border: "none",
                  display: "block",
                  textAlign: "left",
                  borderRadius: "none",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.contrastText
                  }
                }}
              >
                <Box display={"flex"} alignItems={"center"} letterSpacing={0.5}>
                  <Image
                    src={"/pin.svg"}
                    alt={`プロフィールに固定するボタン`}
                    width={18}
                    height={18}
                    style={{ marginRight: 10 }}
                  />
                  {isPinned ? "固定解除する" : "固定する"}
                </Box>
              </Button>
              <Button
                onClick={handleDeleteModalToggle}
                sx={{
                  border: "none",
                  display: "block",
                  textAlign: "left",
                  borderRadius: "none",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.contrastText
                  }
                }}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  letterSpacing={0.5}
                  color={red[400]}
                >
                  <Image
                    src={"/delete.svg"}
                    alt={`投稿削除ボタン`}
                    width={18}
                    height={18}
                    style={{ marginRight: 10 }}
                  />
                  削除する
                </Box>
              </Button>
            </Box>
          </Fade>
        )}
      </Popper>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleDeleteModalToggle}
        reflectionCUID={reflectionCUID}
      />
    </>
  );
};
