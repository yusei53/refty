import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box } from "@mui/material";
import ToEditPageButton from "./ToEditPageButton";
import { KebabButtonPopupContainer } from "@/src/features/common/kebab-button-popup";

type ReflectionSettingHeaderProps = {
  username: string;
  reflectionCUID: string;
  isCurrentUser: boolean;
  isPublic: boolean;
  onBackNavigation: () => void;
};

const ReflectionSettingHeader: React.FC<ReflectionSettingHeaderProps> = ({
  username,
  reflectionCUID,
  isPublic,
  isCurrentUser,
  onBackNavigation
}) => {
  return (
    <Box
      component={"header"}
      position={"fixed"}
      top={{ xs: 0, md: 15 }}
      bgcolor={{ xs: "white", md: "transparent" }}
      left={{ xs: 0, md: 25 }}
      right={{ xs: 0, md: 25 }}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={1.5}
      py={1}
      zIndex={1}
      boxShadow={{ xs: "0px 0.7px 1px rgba(0, 0, 0, 0.1)", md: "none" }}
    >
      <KeyboardBackspaceIcon
        onClick={onBackNavigation}
        sx={{ cursor: "pointer" }}
      />

      <Box display="flex" alignItems="center" gap={1}>
        <KebabButtonPopupContainer
          reflectionCUID={reflectionCUID}
          username={username}
          isPublic={isPublic}
          isCurrentUser={isCurrentUser}
          isReflectionSettingHeader
        />
        {isCurrentUser && (
          <ToEditPageButton
            username={username}
            reflectionCUID={reflectionCUID}
          />
        )}
      </Box>
    </Box>
  );
};

export default ReflectionSettingHeader;
