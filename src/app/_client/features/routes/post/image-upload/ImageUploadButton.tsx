import { Box, Button } from "@mui/material";

type ImageUploadButtonProps = {
  onImageSelect: (file: File, url: string) => void;
};

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onImageSelect
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // 選択された各画像に対して
    Array.from(files).forEach((file) => {
      // 一時的なURLを生成
      const previewUrl = URL.createObjectURL(file);

      // 親コンポーネントに通知
      onImageSelect(file, previewUrl);
    });
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
