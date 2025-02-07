import { useState } from "react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import { Button } from "@/src/components/button";
import { useCreateFolder } from "@/src/hooks/folder/useCreateFolder";

type NewFolderFieldProps = {
  username: string;
  onRefetchFolder: () => void;
};

//TODO: 命名
export const NewFolderField = ({
  username,
  onRefetchFolder
}: NewFolderFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const createFolderHook = useCreateFolder(username);
  if (!createFolderHook) return null;
  const { control, isSubmitting, errors, onSubmit, reset } = createFolderHook;

  const handleFolderSubmit = async (e: React.FormEvent) => {
    await onSubmit(e);
    onRefetchFolder();
    reset();
    setIsEditing(false);
  };

  return (
    <Box>
      {isEditing ? (
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
                  fontSize: 14,
                  "& .MuiInputBase-root": {
                    fontSize: 14,
                    height: 30
                  }
                }}
              />
            )}
          />
          <Button type="submit" disabled={isSubmitting} sx={button}>
            作成
          </Button>
        </Box>
      ) : (
        <Box
          sx={{ ml: 2, cursor: "pointer", display: "inline-block" }}
          onClick={() => setIsEditing(true)}
        >
          <Image
            src={"/add.svg"}
            alt={"新規フォルダ作成ボタン"}
            width={24}
            height={24}
          />
        </Box>
      )}
    </Box>
  );
};

const button = {
  fontSize: 13.5,
  p: "3px 6px",
  letterSpacing: 0.8,
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};
