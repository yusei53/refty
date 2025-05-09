import Image from "next/image";
import { Box, Fade, Popper } from "@mui/material";
import { PopupButton } from "@/src/app/_client/features/common/kebab-button-popup/PopupButton";
import { theme } from "@/src/app/_client/utils/theme";

type ReportOpenPopupProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  isReportOpen: boolean;
  onOpenPopup: (event: React.MouseEvent<HTMLElement>) => void;
  onIsReportOpenToggle: () => void;
};

const ReportOpenPopup: React.FC<ReportOpenPopupProps> = ({
  anchorEl,
  open,
  isReportOpen,
  onOpenPopup,
  onIsReportOpenToggle
}) => {
  return (
    <>
      <Box
        component={"button"}
        type={"button"}
        bgcolor={theme.palette.primary.main}
        border={`1px solid ${theme.palette.grey[400]}`}
        borderRadius={2}
        height={30}
        display={"flex"}
        alignItems={"center"}
        onClick={onOpenPopup}
        mt={2}
        px={1}
        sx={{
          cursor: "pointer"
        }}
      >
        {isReportOpen ? (
          <>
            <Image
              src={"/unlock.png"}
              alt={"公開中ボタン"}
              width={15}
              height={15}
              style={{ marginRight: 4 }}
            />
            公開
          </>
        ) : (
          <>
            <Image
              src={"/lock.png"}
              alt={"非公開中ボタン"}
              width={15}
              height={15}
              style={{ marginRight: 4 }}
            />
            非公開
          </>
        )}
        中
      </Box>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement={"bottom-start"}
        sx={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box boxShadow={1} borderRadius={2.5} bgcolor={"white"}>
              {isReportOpen ? (
                <PopupButton
                  text={"非公開にする"}
                  src={"/lock.png"}
                  alt={"非公開ボタン"}
                  onClick={onIsReportOpenToggle}
                />
              ) : (
                <PopupButton
                  text={"公開にする"}
                  src={"/unlock.png"}
                  alt={"公開ボタン"}
                  onClick={onIsReportOpenToggle}
                />
              )}
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default ReportOpenPopup;
