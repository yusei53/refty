import { useState } from "react";
import { Box } from "@mui/material";
import { DeleteConfirmationModal } from "../../reflection-list/modal/DeleteConfirmationModal";
import { KebabButtonPopupContainer } from "../../ui/shared/popup";
import ReflectionSettingButton from "./ReflectionSettingButton";

type ReflectionSettingProps = {
  username: string;
  reflectionCUID: string;
  isCurrentUser: boolean;
  isPublic: boolean;
  isPinned: boolean;
};

const ReflectionSetting: React.FC<ReflectionSettingProps> = ({
  username,
  reflectionCUID,
  isPublic,
  isCurrentUser,
  isPinned
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModalToggle = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

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
            <KebabButtonPopupContainer
              reflectionCUID={reflectionCUID}
              username={username}
              isPublic={isPublic}
              isPinned={isPinned}
              isCurrentUser={isCurrentUser}
              isReflectionSetting={true}
            />
          </Box>
          {isCurrentUser && (
            <ReflectionSettingButton
              text={"編集する"}
              src={"/edit.svg"}
              alt={"編集するボタン"}
            />
          )}
          <DeleteConfirmationModal
            open={isDeleteModalOpen}
            onClose={handleDeleteModalToggle}
            reflectionCUID={reflectionCUID}
          />
        </Box>
      </Box>
    </>
  );
};

export default ReflectionSetting;
