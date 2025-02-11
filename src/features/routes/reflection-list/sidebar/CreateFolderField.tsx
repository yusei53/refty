import { useState } from "react";
import { Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { Box, TextField, Typography, useMediaQuery } from "@mui/material";
import { Button } from "@/src/components/button";
import { useCreateFolder } from "@/src/hooks/folder/useCreateFolder";
import { theme } from "@/src/utils/theme";

type CreateFolderFieldProps = {
  username: string;
  onRefetch: (username: string) => Promise<void>;
};

export const CreateFolderField = ({
  username,
  onRefetch
}: CreateFolderFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const createFolderHook = useCreateFolder({
    username,
    onRefetch,
    setIsEditing
  });
  if (!createFolderHook) return null;
  const { control, errors, onSubmit } = createFolderHook;

  // MEMO: スマホのEnterキー(改行ボタン等)で送信されてしまうのを防ぐ
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleFolderSubmit = async (e: React.FormEvent) => {
    await onSubmit(e);
  };

  return (
    <Box>
      {isEditing ? (
        <>
          <Box
            component="form"
            onSubmit={handleFolderSubmit}
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  size="small"
                  placeholder="フォルダ名"
                  error={Boolean(errors?.name)}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={isMobile ? handleKeyDown : undefined}
                  sx={{
                    width: "100%",
                    fontSize: 14,
                    mx: { lg: 1.5 },
                    "& .MuiInputBase-root": {
                      fontSize: 14,
                      height: 30
                    }
                  }}
                />
              )}
            />
            {isMobile && (
              <Button
                onClick={handleFolderSubmit}
                onMouseDown={(e) => e.preventDefault()}
                sx={button}
              >
                作成
              </Button>
            )}
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          mx={1.5}
          mb={1}
          gap={0.3}
          sx={{ cursor: "pointer" }}
          onClick={() => setIsEditing(true)}
        >
          <AddIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
          <Typography
            component={"span"}
            fontSize={13}
            color={theme.palette.grey[600]}
            letterSpacing={0.8}
          >
            新規フォルダ作成
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const button = {
  fontSize: 13.5,
  p: "3px",
  letterSpacing: 0.8,
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};
