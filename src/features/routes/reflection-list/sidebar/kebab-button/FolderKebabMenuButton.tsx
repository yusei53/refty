import Image from "next/image";
import { Box, Fade, Popper } from "@mui/material";
import { red } from "@mui/material/colors";
import { PopupButton } from "@/src/features/common/kebab-button-popup/PopupButton";
import { theme } from "@/src/utils/theme";

type FolderKebabMenuButtonProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onOpenPopup: (event: React.MouseEvent<HTMLElement>) => void;
  onClosePopup: () => void;
  onSelectMode: () => void;
  onCloseSidebar: () => void;
  onEditFolderName: () => void;
  onDeleteFolder: () => void;
};

export const FolderKebabMenuButton: React.FC<FolderKebabMenuButtonProps> = ({
  anchorEl,
  open,
  onOpenPopup,
  onClosePopup,
  onSelectMode,
  onCloseSidebar,
  onEditFolderName,
  onDeleteFolder
}) => {
  return (
    <>
      <Box
        component={"button"}
        type={"button"}
        bgcolor={"transparent"}
        border={"none"}
        width={22}
        height={22}
        borderRadius={10}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        onClick={onOpenPopup}
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
          width={18}
          height={18}
        />
      </Box>
      <Popper
        disablePortal
        open={open}
        anchorEl={anchorEl}
        transition
        placement={"bottom-end"}
        sx={{
          position: "relative",
          zIndex: 10
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              boxShadow={1}
              borderRadius={2.5}
              bgcolor={"white"}
              minWidth={200}
            >
              <PopupButton
                text={"フォルダ内を編集"}
                src={"/add-to-folder.svg"}
                alt={`フォルダに投稿を追加するボタン`}
                onClick={() => {
                  onClosePopup();
                  onSelectMode();
                  onCloseSidebar();
                }}
              />
              <PopupButton
                text={"名前を変更する"}
                src={"/edit.svg"}
                alt={`フォルダ名を編集するボタン`}
                onClick={() => {
                  onEditFolderName();
                  onClosePopup();
                }}
              />
              <PopupButton
                text={"削除する"}
                src={"/delete.svg"}
                alt={`フォルダを削除するボタン`}
                textcolor={red[400]}
                onClick={() => {
                  onDeleteFolder();
                  onClosePopup();
                }}
              />
            </Box>
          </Fade>
        )}
      </Popper>
      {/* // MEMO: フォルダの削除確認モーダルも作った方がいい */}
    </>
  );
};
