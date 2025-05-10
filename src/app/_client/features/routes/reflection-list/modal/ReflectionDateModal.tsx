import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import type { RandomReflection } from "@/src/app/_client/api/reflection-api";
import { ForbiddenMessage } from "../../../common/forbidden-message";
import { ReflectionCardOfModal } from "./ReflectionCardOfModal";
import { formatDate } from "@/src/app/_shared/date-helper";

type ReflectionDateModalProps = {
  open: boolean;
  onClose: () => void;
  username: string;
  reflectionsByDate: RandomReflection[] | null;
};

const modal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  maxHeight: "50vh",
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 4,
  borderRadius: 5,
  outline: "none",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column"
};

export const ReflectionDateModal: React.FC<ReflectionDateModalProps> = ({
  open,
  onClose,
  username,
  reflectionsByDate
}) => {
  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={modal}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1
          }}
        >
          <CloseIcon />
        </IconButton>
        {reflectionsByDate && reflectionsByDate.length > 0 ? (
          <>
            <Typography component={"h2"} fontSize={18} mb={2}>
              {formatDate(reflectionsByDate?.[0]?.createdAt)}
              の投稿
            </Typography>
            <Box
              sx={{
                overflowY: "auto"
              }}
            >
              <Box display={"flex"} flexDirection={"column"} gap={2}>
                {reflectionsByDate.map((reflection) => (
                  <ReflectionCardOfModal
                    key={reflection.reflectionCUID}
                    username={username}
                    reflection={reflection}
                  />
                ))}
              </Box>
            </Box>
          </>
        ) : (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <ForbiddenMessage />
          </Box>
        )}
      </Box>
    </Modal>
  );
};
