import { Box } from "@mui/material";
import { KebabButtonPopupContainer } from "../../ui/shared/popup";
import HeaderTableOfContents from "../table-of-contents/HeaderTableOfContents";
import ToEditPageButton from "./ToEditPageButton";

type ReflectionSettingHeaderProps = {
  username: string;
  reflectionCUID: string;
  isCurrentUser: boolean;
  isPublic: boolean;
  tocArray: { href: string; title: string }[];
};

const ReflectionSettingHeader: React.FC<ReflectionSettingHeaderProps> = ({
  username,
  reflectionCUID,
  isPublic,
  isCurrentUser,
  tocArray
}) => {
  return (
    <>
      <Box
        component={"header"}
        position={"fixed"}
        top={{ xs: 0, md: 25 }}
        right={{ xs: 0, md: 35 }}
        bgcolor={{ xs: "white", md: "transparent" }}
        width={{ xs: "100%", md: "auto" }}
        zIndex={1}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          px={{ xs: 1.5, md: 0 }}
          py={{ xs: 1, md: 0 }}
          boxShadow={{ xs: "0px 0.7px 1px rgba(0, 0, 0, 0.1)", md: "none" }}
        >
          <Box mt={0.5}>
            <HeaderTableOfContents tocArray={tocArray} />
          </Box>
          <Box mt={0.5}>
            <KebabButtonPopupContainer
              reflectionCUID={reflectionCUID}
              username={username}
              isPublic={isPublic}
              isCurrentUser={isCurrentUser}
              isReflectionSettingHeader
            />
          </Box>
          {isCurrentUser && (
            <ToEditPageButton
              username={username}
              reflectionCUID={reflectionCUID}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ReflectionSettingHeader;
