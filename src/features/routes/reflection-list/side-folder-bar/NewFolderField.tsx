import { useState } from "react";
import Image from "next/image";
import { Box, TextField } from "@mui/material";
import { folderAPI } from "@/src/api/folder-api";

type NewFolderFieldProps = {
  username: string;
  onFolderCreated: () => void;
};

export const NewFolderField = ({
  username,
  onFolderCreated
}: NewFolderFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      folderAPI.createFolder(username, folderName).then(() => {
        setFolderName("");
        setIsEditing(false);
        onFolderCreated();
      });
    }
  };

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
