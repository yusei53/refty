import { useState } from "react";
import { red } from "@mui/material/colors";
import { DeleteConfirmationModal } from "../../reflection-list/modal/DeleteConfirmationModal";
import ReflectionSettingButton from "./ReflectionSettingButton";

type ReflectionSettingProps = {
  username: string;
  reflectionCUID: string;
  isCurrentUser: boolean;
  isPublic: boolean;
  isPinned: boolean;
  onCopyLink: () => void;
  onUpdatePublic: () => void;
  onUpdatePinned: () => void;
};

const ReflectionSetting: React.FC<ReflectionSettingProps> = ({
  username,
  reflectionCUID,
  isPublic,
  isCurrentUser,
  isPinned,
  onCopyLink,
  onUpdatePublic,
  onUpdatePinned
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModalToggle = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <>
      <ReflectionSettingButton
        text={"リンクをコピーする"}
        src={"/share.svg"}
        alt={`リンクをコピーするボタン`}
        onClick={onCopyLink}
      />
      {isCurrentUser && (
        <>
          <ReflectionSettingButton
            text={"編集する"}
            href={`/${username}/${reflectionCUID}/edit`}
            src={"/edit.svg"}
            alt={`編集するボタン`}
          />
          <ReflectionSettingButton
            text={isPublic ? "非公開にする" : "公開する"}
            src={"/lock-google.svg"}
            alt={"公開設定ボタン"}
            onClick={onUpdatePublic}
          />
          <ReflectionSettingButton
            text={isPinned ? "固定解除する" : "固定する"}
            src={"/pin.svg"}
            alt={`プロフィールに固定するボタン`}
            onClick={onUpdatePinned}
          />
          <ReflectionSettingButton
            text={"削除する"}
            src={"/delete.svg"}
            alt={`投稿削除ボタン`}
            onClick={handleDeleteModalToggle}
            textcolor={red[400]}
          />
          <DeleteConfirmationModal
            open={isDeleteModalOpen}
            onClose={handleDeleteModalToggle}
            reflectionCUID={reflectionCUID}
          />
        </>
      )}
    </>
  );
};

export default ReflectionSetting;
