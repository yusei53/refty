import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import type { RandomReflection } from "@/src/app/_client/api/reflection-api";
import { ReflectionCardOfModal } from "./ReflectionCardOfModal";
import { theme } from "@/src/app/_client/utils/theme";

type GoodJobModalProps = {
  open: boolean;
  onClose: () => void;
  username: string;
  randomReflection: RandomReflection | null;
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
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 4,
  borderRadius: 5,
  outline: "none"
};

export const GoodJobModal: React.FC<GoodJobModalProps> = ({
  open,
  onClose,
  username,
  randomReflection
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
        {randomReflection && (
          <>
            <Divider
              sx={{
                width: "100%",
                borderColor: theme.palette.grey[400],
                mt: 4,
                mb: 2
              }}
            />
            <Typography
              component={"h3"}
              my={0.5}
              letterSpacing={0.5}
              whiteSpace={"nowrap"}
              fontSize={{ xs: 15, sm: 16 }}
            >
              過去の投稿を少しだけ覗いてみませんか？
            </Typography>
            <Typography
              fontSize={{ xs: 12.5, sm: 14 }}
              mb={1.5}
              whiteSpace={"nowrap"}
            >
              この投稿が成長のきっかけだったのかもしれません✨
            </Typography>
            <Box bgcolor={theme.palette.grey[50]} borderRadius={1} p={1.5}>
              <ReflectionCardOfModal
                username={username}
                reflection={randomReflection}
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};
