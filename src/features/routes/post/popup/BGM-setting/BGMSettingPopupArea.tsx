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
  getBGMName: () => string;
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
  toggleNightMode,
  getBGMName
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
          whiteSpace: "nowrap",
          ml: 4
        }}
      >
        <Image
          src={currentTrack ? "/unlock.png" : "/lock.png"}
          alt={getBGMName()}
          width={18}
          height={18}
          style={{ marginRight: 4 }}
        />
        {getBGMName()}
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
                BGMName="bird"
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
                BGMName="rain"
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
                BGMName="star"
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
                BGMName="stop"
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
