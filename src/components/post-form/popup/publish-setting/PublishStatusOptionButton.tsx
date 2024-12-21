import { Button } from "@/src/components/shared/button";
import { theme } from "@/src/utils/theme";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";

type PublishStatusOptionButtonProps = {
  isActive: boolean;
  onClick: () => void;
  icon: string;
  text: string;
  description: string;
};

const PublishStatusOptionButton: React.FC<PublishStatusOptionButtonProps> = ({
  isActive,
  onClick,
  icon,
  text,
  description,
}) => (
  <Button
    onClick={onClick}
    sx={{
      border: "none",
      display: "block",
      textAlign: "left",
      width: "100%",
      borderRadius: "none",
      "&:hover": { backgroundColor: theme.palette.primary.contrastText },
    }}
  >
    <Box display={"flex"} alignItems={"center"}>
      <Image
        src={icon}
        alt={`${text} Icon`}
        width={18}
        height={18}
        style={{ marginRight: 4 }}
      />
      {text}
      {isActive && <CheckIcon fontSize="small" sx={{ ml: 1 }} />}
    </Box>
    <Typography fontSize={12} color={theme.palette.grey[600]}>
      {description}
    </Typography>
  </Button>
);

export default PublishStatusOptionButton;
