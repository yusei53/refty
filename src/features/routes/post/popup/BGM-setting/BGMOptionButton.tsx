import CheckIcon from "@mui/icons-material/Check";
import { Box, Typography } from "@mui/material";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type BGMOptionButtonProps = {
  currentTrack: string;
  BGMName: string;
  onClick: () => void;
  text: string;
  description: string;
};

export const BGMOptionButton: React.FC<BGMOptionButtonProps> = ({
  currentTrack,
  BGMName,
  onClick,
  text,
  description
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        border: "none",
        display: "block",
        textAlign: "left",
        width: "100%",
        borderRadius: "none",
        "&:hover": { backgroundColor: theme.palette.primary.contrastText }
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        {text}
        {currentTrack == BGMName && (
          <CheckIcon fontSize="small" sx={{ ml: 1 }} />
        )}
      </Box>
      <Typography fontSize={12} color={theme.palette.grey[600]}>
        {description}
      </Typography>
    </Button>
  );
};
