import { theme } from "@/src/utils/theme";
import { Box, Popper, Fade, SxProps } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { DeleteConfirmationModal } from "../../reflection-list/modal/DeleteConfirmationModal";
import { red } from "@mui/material/colors";
import PopupButton from "./PopupButton";

type KebabMenuButtonProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onCopyLink: () => void;
  onPinToggle: () => void;
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
  onCopyLink,
  onPinToggle,
  username,
  reflectionCUID,
  sx,
  isPinned,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModalToggle = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
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
            bgcolor: `${theme.palette.primary.contrastText}`,
          },
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
              <PopupButton
                text={"リンクをコピーする"}
                src={"/share.svg"}
                alt={`リンクをコピーするボタン`}
                onClick={onCopyLink}
              />
              <PopupButton
                text={"編集する"}
                href={`/${username}/${reflectionCUID}/edit`}
                src={"/edit.svg"}
                alt={`編集するボタン`}
              />
              <PopupButton
                text={isPinned ? "固定解除する" : "固定する"}
                src={"/pin.svg"}
                alt={`プロフィールに固定するボタン`}
                onClick={onPinToggle}
              />
              <PopupButton
                text={"削除する"}
                src={"/delete.svg"}
                alt={`投稿削除ボタン`}
                onClick={handleDeleteModalToggle}
                textcolor={red[400]}
              />
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
