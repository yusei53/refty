import { Box, Divider, Typography } from "@mui/material";
import type { AIFeedbackType } from "@/src/api/send-to-sqs-api";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type SelectAIButtonProps = {
  onAITypeSelect: (type: AIFeedbackType) => void;
  AIType: AIFeedbackType;
  icon: string;
  detail: string;
  description: string;
};

const button = {
  border: "none",
  display: "block",
  textAlign: "left",
  width: "100%"
};

export const SelectAIButton: React.FC<SelectAIButtonProps> = ({
  onAITypeSelect,
  AIType,
  icon,
  detail,
  description
}) => {
  return (
    <>
      <Button
        onClick={() => onAITypeSelect(AIType)}
        sx={{
          ...button,
          fontSize: 15,
          borderRadius: "none",
          letterSpacing: 0.8,
          "&:hover": {
            backgroundColor: theme.palette.primary.contrastText
          }
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          width={{ xs: "75vw", sm: "350px" }}
        >
          <Typography fontSize={30}>{icon}</Typography>
          <Box ml={2} py={0.3}>
            <Typography letterSpacing={0.8} fontSize={13.5} fontWeight={550}>
              {detail}
            </Typography>
            <Typography
              letterSpacing={0.5}
              fontSize={11.5}
              color={theme.palette.grey[600]}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Button>
      <Divider sx={{ borderColor: theme.palette.grey[400] }} />
    </>
  );
};
