import { useState } from "react";
import { Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { Box, TextField, Typography } from "@mui/material";
import { useCreateFolder } from "@/src/hooks/folder/useCreateFolder";
import { theme } from "@/src/utils/theme";

type CreateFolderFieldProps = {
  username: string;
  onRefetchFolder: () => void;
};

export const CreateFolderField = ({
  username,
  onRefetchFolder
}: CreateFolderFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const createFolderHook = useCreateFolder({
    username,
    onRefetchFolder,
    setIsEditing
  });
  if (!createFolderHook) return null;
  const { control, errors, onSubmit } = createFolderHook;

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
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                  helperText={errors?.name?.message}
                  onBlur={() => setIsEditing(false)}
                  sx={{
                    width: "100%",
                    fontSize: 14,
                    mx: 1.5,
                    "& .MuiInputBase-root": {
                      fontSize: 14,
                      height: 30
                    }
                  }}
                />
              )}
            />
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
