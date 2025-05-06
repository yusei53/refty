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
    <Box mb={2}>
      <Button
        variant="contained"
        component="label"
        sx={{
          backgroundColor: "primary.main",
          "&:hover": {
            backgroundColor: "primary.dark"
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
