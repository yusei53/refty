import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";

type GoodJobModalProps = {
  open: boolean;
  onClose: () => void;
};

const modal = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 360, sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 4,
  borderRadius: 5,
  outline: "none"
};

export const GoodJobModal: React.FC<GoodJobModalProps> = ({
  open,
  onClose
}) => {
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
          今日も一日お疲れさまでした
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
            一息ついて、ゆっくり休んでくださいね
          </Typography>
        </Box>
        <Image
          src={"/rabbit.png"}
          alt={"リフティのロゴ"}
          width={230}
          height={180}
          priority
          style={{ marginBlock: 10 }}
        />
      </Box>
    </Modal>
  );
};
