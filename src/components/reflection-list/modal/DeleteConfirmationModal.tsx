import { useDeleteReflection } from "@/src/hooks/reflection/useDeleteReflection";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";

type DeleteConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  reflectionCUID: string;
};

const modal = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 360, sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 4,
  borderRadius: 5,
  outline: "none"
};

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ open, onClose, reflectionCUID }) => {
  const { handleDeleteReflection } = useDeleteReflection({
    reflectionCUID
  });

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={modal}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          component={"h2"}
          fontWeight={550}
          mt={2}
          letterSpacing={0.5}
          fontSize={{ xs: 20, sm: 23 }}
        >
          本当に削除しますか？
        </Typography>
        <Box
          mt={1.5}
          mb={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={0.5}
        >
          <Typography letterSpacing={0.5}>
            削除すると、この投稿は完全に削除されます
          </Typography>
        </Box>
        <Box display={"flex"} gap={4} mt={2}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "#13396E",
              borderColor: "#13396E",
              "&:hover": {
                color: "#0A1F3D",
                borderColor: "#0A1F3D",
                backgroundColor: "rgba(19, 57, 110, 0.04)"
              }
            }}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteReflection}
          >
            削除する
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
