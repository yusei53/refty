import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";

export type AppealCardProps = {
  image: string;
  title: string;
  description: string;
  isComingSoon?: boolean;
};

const AppealCard: React.FC<AppealCardProps> = ({
  image,
  title,
  description,
  isComingSoon = false
}) => {
  const { isMobile } = useResponsive();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={{ xs: "row", sm: "column" }}
      position={"relative"}
    >
      {isComingSoon && (
        <Box
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
          bgcolor={"rgba(0, 0, 0, 0.4)"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={2}
        >
          <Typography
            color={"white"}
            fontSize={{ xs: 28, md: 32 }}
            fontWeight={"bold"}
            fontStyle={"italic"}
          >
            Coming Soon
          </Typography>
        </Box>
      )}
      <Image
        src={`/lp/appeal/${image}`}
        alt={"feature image"}
        width={90}
        height={90}
        style={isMobile ? { width: 70, height: 70, marginRight: 10 } : {}}
      />
      <Box textAlign={{ xs: "left", sm: "center" }}>
        <Typography
          component={"h4"}
          fontSize={{ xs: 15, md: 18 }}
          fontWeight={"bold"}
          my={{ xs: 0.5, sm: 1.5 }}
        >
          {title}
        </Typography>
        <Typography fontSize={13}>{description}</Typography>
      </Box>
    </Box>
  );
};

export default AppealCard;
