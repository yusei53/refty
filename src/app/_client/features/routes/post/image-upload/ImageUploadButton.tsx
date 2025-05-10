import Image from "next/image";
import { IconButton } from "@mui/material";

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
    <IconButton aria-label="画像を追加" component="label">
      <Image src="/add-photo.svg" alt="画像を追加" width={24} height={24} />
      <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
    </IconButton>
  );
};
