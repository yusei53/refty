import Image from "next/image";
import { Box, Divider, Fade, Popper } from "@mui/material";
import PublishStatusOptionButton from "./PublishStatusOptionButton";
import { Button } from "@/src/app/_client/components/button";
import { theme } from "@/src/app/_client/utils/theme";

type PublishSettingPopupAreaProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  open: boolean;
  anchorEl: HTMLElement | null;
  onToggle: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
};

const PublishSettingPopupArea: React.FC<PublishSettingPopupAreaProps> = ({
  value,
  onChange,
  open,
  anchorEl,
  onToggle,
  onClose
}) => {
  return (
    <>
      <Button
        onClick={onToggle}
        onBlur={onClose}
        sx={{
          width: "90px",
          border: "none",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap"
        }}
      >
        <Image
          src={value ? "/unlock.png" : "/lock.png"}
          alt={value ? "非公開アイコン" : "公開アイコン"}
          width={18}
          height={18}
          style={{ marginRight: 4 }}
        />
        {value ? "公開" : "非公開"}
      </Button>
      <Popper
        disablePortal
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              boxShadow={1}
              borderRadius={2}
              bgcolor={"white"}
              minWidth={"200px"}
              color={"black !important"}
            >
              <PublishStatusOptionButton
                isActive={value}
                onClick={() => {
                  onChange(true);
                  onClose();
                }}
                icon="/unlock.png"
                text="公開"
                description="他の人も見えるようになります"
              />
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <PublishStatusOptionButton
                isActive={!value}
                onClick={() => {
                  onChange(false);
                  onClose();
                }}
                icon="/lock.png"
                text="非公開"
                description="自分だけが見えるようになります"
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default PublishSettingPopupArea;
