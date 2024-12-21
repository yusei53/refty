import Image from "next/image";
import { Controller } from "react-hook-form";
import { Box, Modal, Typography } from "@mui/material";
import type { Control, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../ui/shared/alert";
import { Button } from "../ui/shared/button";
import { CustomInput } from "../ui/shared/input";
import { theme } from "@/src/utils/theme";

type FormValues = {
  username: string;
};

type SettingUsernameModalProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  open: boolean;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
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
  width: { xs: 360, md: 440 },
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 4,
  borderRadius: 5
};

const SettingUsernameModal: React.FC<SettingUsernameModalProps> = ({
  onSubmit,
  control,
  errors,
  open,
  isSubmitting,
  isSubmitSuccessful
}) => {
  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box>
        {/* MEMO: ユーザーネーム設定をしないユーザーがいくつかいるためコメントアウト */}
        {/* <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 30,
            right: 30,
          }}
        >
          <CloseIcon
            fontSize="large"
            sx={{
              color: "white",
            }}
          />
        </IconButton> */}
        <Box sx={modal}>
          <Typography component={"h2"} fontWeight={550} mb={2} fontSize={18}>
            ユーザーネーム設定
          </Typography>

          <Image
            src={"/favicon.svg"}
            alt={"リフティのロゴ"}
            width={80}
            height={80}
          />
          <Box mt={3}>
            <Typography>あなただけのURLを設定しましょう！</Typography>
            <Typography fontSize={12} color={theme.palette.grey[600]}>
              ※あとで変更可能です
            </Typography>
          </Box>
          <Box component={"form"} onSubmit={onSubmit}>
            <Box my={5}>
              <Box display={"flex"} whiteSpace={"nowrap"}>
                <Typography letterSpacing={0.5}>
                  https://www.refty.jp/
                </Typography>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      id={"username"}
                      placeholder={"example"}
                      value={field.value}
                      onChange={field.onChange}
                      style={{
                        fontSize: "0.9rem",
                        borderBottom: `1.5px solid ${theme.palette.grey[400]}`,
                        marginTop: "0.5px" // MEMO: URLとinputの間の隙間を調整
                      }}
                    />
                  )}
                />
              </Box>
              {errors.username && (
                <ErrorMessage message={errors.username.message} />
              )}
            </Box>
            <Button
              type="submit"
              disabled={isSubmitting || isSubmitSuccessful}
              sx={{ display: "block", margin: "auto" }}
            >
              {isSubmitting || isSubmitSuccessful ? "設定中..." : "設定する"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SettingUsernameModal;
