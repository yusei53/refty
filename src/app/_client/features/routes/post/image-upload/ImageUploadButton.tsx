import { Box, Button } from "@mui/material";

type ImageUploadButtonProps = {
  onImageSelect: (file: File) => void;
};

// MEMO: 仕様が決まっていないので仮のコンポーネント;

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onImageSelect
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    onImageSelect(files[0]);
  };

  return (
    <Box
      position="fixed"
      bottom={16}
      right={16}
      zIndex={1000}
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 1,
        boxShadow: 3,
        p: 1
      }}
    >
      <Button
        variant="contained"
        component="label"
        sx={{
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0"
          }
        }}
      >
        画像を選択
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Button>
    </Box>
  );
};
