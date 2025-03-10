import Image from "next/image";
import { Box, Divider, Fade, Popper } from "@mui/material";
import SelectedBGMOptionButton from "./SelectedBGMOptionButton";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type BGMSettingPopupAreaProps = {
  currentTrack: string;
  playTrack: (track: string) => void;
  open: boolean;
  anchorEl: HTMLElement | null;
  onToggle: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  stop: () => void;
  isNightMode: boolean;
  toggleNightMode: () => void;
};

const BGMSettingPopupArea: React.FC<BGMSettingPopupAreaProps> = ({
  currentTrack,
  playTrack,
  open,
  anchorEl,
  onToggle,
  onClose,
  stop,
  isNightMode,
  toggleNightMode
}) => {
  return (
    <>
      <Button
        onClick={onToggle}
        onBlur={onClose}
        sx={{
          width: "90px",
          border: "none",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap"
        }}
      >
        <Image
          src={currentTrack ? "/unlock.png" : "/lock.png"}
          alt={
            currentTrack === "bird"
              ? "自然BGMアイコン"
              : currentTrack === "rain"
                ? "アンビエントBGMアイコン"
                : currentTrack === "star"
                  ? "ナイトBGMアイコン"
                  : "BGMアイコン"
          }
          width={18}
          height={18}
          style={{ marginRight: 4 }}
        />
        {currentTrack === "bird"
          ? "自然BGM"
          : currentTrack === "rain"
            ? "アンビエントBGM"
            : currentTrack === "star"
              ? "ナイトBGM"
              : "BGM"}
      </Button>
      <Popper
        disablePortal
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              boxShadow={1}
              borderRadius={2}
              bgcolor={"white"}
              minWidth={"200px"}
            >
              <SelectedBGMOptionButton
                currentTrack={currentTrack}
                onClick={() => {
                  playTrack("bird");
                  onClose();
                }}
                icon="/unlock.png"
                text="自然BGM"
                description="ほげほげ"
              />
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <SelectedBGMOptionButton
                currentTrack={currentTrack}
                onClick={() => {
                  playTrack("rain");
                  onClose();
                }}
                icon="/lock.png"
                text="アンビエントBGM"
                description="ほげほげ"
              />
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <SelectedBGMOptionButton
                currentTrack={currentTrack}
                onClick={() => {
                  playTrack("star");
                  toggleNightMode();
                  onClose();
                }}
                icon="/lock.png"
                text="ナイトBGM"
                description="ほげほげ"
              />
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <SelectedBGMOptionButton
                currentTrack={currentTrack}
                onClick={() => {
                  stop();
                  if (isNightMode) {
                    toggleNightMode();
                  }
                  onClose();
                }}
                icon="/lock.png"
                text="BGM停止"
                description="ほげほげ"
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default BGMSettingPopupArea;
