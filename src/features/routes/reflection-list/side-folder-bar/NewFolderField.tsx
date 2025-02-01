import Image from "next/image";
import { Box, TextField } from "@mui/material";
import { useNewFolder } from "@/src/hooks/sidebar/folder/useNewFolder";

type NewFolderFieldProps = {
  username: string;
  onFolderCreated: () => void;
};

export const NewFolderField = ({
  username,
  onFolderCreated
}: NewFolderFieldProps) => {
  const {
    isEditing,
    folderName,
    handleClick,
    handleSubmit,
    setFolderName,
    setIsEditing
  } = useNewFolder({
    username,
    onFolderCreated
  });

  return (
    <Box>
      {isEditing ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            size="small"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            placeholder="フォルダ名"
          />
        </Box>
      ) : (
        <Image
          src={"/add.svg"}
          alt={"新規フォルダ作成ボタン"}
          width={24}
          height={24}
          style={{ marginLeft: 15, cursor: "pointer" }}
          onClick={handleClick}
        />
      )}
    </Box>
  );
};
