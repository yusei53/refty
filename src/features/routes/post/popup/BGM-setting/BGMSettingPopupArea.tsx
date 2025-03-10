import { Box, Divider, Fade, Popper } from "@mui/material";
import { BGMOptionButton } from "./BGMOptionButton";
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

export const BGMSettingPopupArea: React.FC<BGMSettingPopupAreaProps> = ({
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
          border: "none"
        }}
      >
        {getBGMName()}
      </Button>
      <Popper
        disablePortal
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 2 }}
        placement="bottom-end"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              boxShadow={1}
              borderRadius={2}
              bgcolor={"white"}
              minWidth={"200px"}
              color={"black !important"}
            >
              <BGMOptionButton
                currentTrack={currentTrack}
                BGMName="bird"
                onClick={() => {
                  playTrack("bird");
                  if (isNightMode) {
                    toggleNightMode();
                  }
                  onClose();
                }}
                text="鳥と自然"
                description="鳥が飛び、自然の音が聞こえます"
              />
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <BGMOptionButton
                currentTrack={currentTrack}
                BGMName="rain"
                onClick={() => {
                  playTrack("rain");
                  if (isNightMode) {
                    toggleNightMode();
                  }
                  onClose();
                }}
                text="静かな雨"
                description="雨が降り、霧雨の音が聞こえます"
              />
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <BGMOptionButton
                currentTrack={currentTrack}
                BGMName="star"
                onClick={() => {
                  playTrack("star");
                  toggleNightMode();
                  onClose();
                }}
                text="星空"
                description="夜空と星が見え、静かな波の音が聞こえます"
              />
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <BGMOptionButton
                currentTrack={currentTrack}
                BGMName="piano"
                onClick={() => {
                  playTrack("piano");
                  if (isNightMode) {
                    toggleNightMode();
                  }
                  onClose();
                }}
                text="ピアノ"
                description="心休まるピアノの音色が聞こえます"
              />
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <BGMOptionButton
                currentTrack={currentTrack}
                BGMName="stop"
                onClick={() => {
                  stop();
                  if (isNightMode) {
                    toggleNightMode();
                  }
                  onClose();
                }}
                text="サウンド停止"
                description="サウンドを停止します"
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
