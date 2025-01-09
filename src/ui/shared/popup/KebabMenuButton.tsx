import { useState } from "react";
import Image from "next/image";
import { Box, Fade, Popper } from "@mui/material";
import { red } from "@mui/material/colors";
import PopupButton from "./PopupButton";
import { DeleteConfirmationModal } from "@/src/components/reflection-list/modal/DeleteConfirmationModal";
import { theme } from "@/src/utils/theme";

type KebabMenuButtonProps = {
  reflectionCUID: string;
  username: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  isPublic: boolean;
  isPinned: boolean;
  isCurrentUser: boolean;
  isReflectionSettingHeader: boolean;
  onOpenPopup: (event: React.MouseEvent<HTMLElement>) => void;
  onClosePopup: () => void;
  onCopyLink: () => void;
  onPublicToggle: () => void;
  onPinToggle: () => void;
};

export const KebabMenuButton: React.FC<KebabMenuButtonProps> = ({
  username,
  reflectionCUID,
  anchorEl,
  open,
  isPublic,
  isPinned,
  isCurrentUser,
  isReflectionSettingHeader,
  onOpenPopup,
  onClosePopup,
  onCopyLink,
  onPublicToggle,
  onPinToggle
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
        onClick={onOpenPopup}
        onBlur={onClosePopup}
        sx={{
          cursor: "pointer",
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
              {isReflectionSettingHeader ? (
                <>
                  <PopupButton
                    text={"リンクをコピーする"}
                    src={"/share.svg"}
                    alt={`リンクをコピーするボタン`}
                    onClick={onCopyLink}
                  />
                  {isCurrentUser && (
                    <PopupButton
                      text={isPublic ? "非公開にする" : "公開する"}
                      src={"/lock-google.svg"}
                      alt={"公開設定ボタン"}
                      onClick={onPublicToggle}
                    />
                  )}
                </>
              ) : (
                <>
                  <PopupButton
                    text={"リンクをコピーする"}
                    src={"/share.svg"}
                    alt={`リンクをコピーするボタン`}
                    onClick={onCopyLink}
                  />
                  {isCurrentUser && (
                    <>
                      <PopupButton
                        text={"編集する"}
                        href={`/${username}/${reflectionCUID}/edit`}
                        src={"/edit.svg"}
                        alt={`編集するボタン`}
                      />
                      <PopupButton
                        text={isPublic ? "非公開にする" : "公開する"}
                        src={"/lock-google.svg"}
                        alt={"公開設定ボタン"}
                        onClick={onPublicToggle}
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
                    </>
                  )}
                </>
              )}
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
