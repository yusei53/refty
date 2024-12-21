import { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Box, Button as MuiButton, Typography } from "@mui/material";
import { theme } from "@/src/utils/theme";

type EmojiPickerProps = {
  selectedEmoji: string;
  setSelectedEmoji: (emoji: string) => void;
  onChange: (emoji: string) => void;
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  selectedEmoji,
  setSelectedEmoji,
  onChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent) => {
    //MEMO: Picker内の要素をクリックした場合は閉じない。Picker以外をクリックした場合は閉じる
    if (
      pickerRef.current &&
      e.relatedTarget &&
      pickerRef.current.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    setShowPicker(false);
  };

  return (
    <Box
      position={"relative"}
      border={"#ededed solid 1px"}
      borderRadius={"8px"}
      width={"fit-content"}
      display={"inline-flex"}
      alignItems={"center"}
    >
      <MuiButton
        sx={{
          fontSize: "24px",
          borderRadius: "8px 0 0 8px",
          p: 0,
          bgcolor: theme.palette.primary.main,
        }}
        onClick={() => setShowPicker(!showPicker)}
        onBlur={handleBlur}
      >
        {selectedEmoji}
      </MuiButton>
      <Box mx={2} display={"flex"} alignItems={"center"}>
        <Typography fontSize={20}>👈</Typography>
        <Typography
          component={"span"}
          color={theme.palette.grey[600]}
          fontSize={"0.8rem"}
          px={1}
        >
          この振り返りを一つの絵文字で表現してみよう!
        </Typography>
      </Box>
      {showPicker && (
        <Box position={"absolute"} top={"100%"} ref={pickerRef} tabIndex={-1}>
          <Picker
            data={data}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onEmojiSelect={(emoji: any) => {
              setSelectedEmoji(emoji.native);
              onChange(emoji.native);
              setShowPicker(false);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default EmojiPicker;
