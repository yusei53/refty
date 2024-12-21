import { Button } from "@/src/components/ui/shared/button";
import { theme } from "@/src/utils/theme";
import { Box, Divider, Fade, Popper, Typography } from "@mui/material";
import { Fragment } from "react";
import {
  ReflectionTemplateType,
  getReflectionTemplateName
} from "./reflection-templates";

type ReflectionTemplatePopupAreaProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  reflectionTemplateType: ReflectionTemplateType;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onTemplateSelect: (
    categoryKey: keyof ReflectionTemplateType
  ) => Promise<void>;
  onClearContent: () => void;
};

const button = {
  border: "none",
  display: "block",
  textAlign: "left",
  width: "100%"
};

const ReflectionTemplatePopupArea: React.FC<
  ReflectionTemplatePopupAreaProps
> = ({
  anchorEl,
  open,
  reflectionTemplateType,
  onClick,
  onClose,
  onTemplateSelect,
  onClearContent
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        onBlur={onClose}
        sx={{
          border: "none",
          p: 0
        }}
      >
        テンプレートを使う
      </Button>
      <Popper open={open} anchorEl={anchorEl} transition sx={{ zIndex: 2 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              boxShadow={1}
              borderRadius={2.5}
              bgcolor={"white"}
              zIndex={2}
              maxHeight={"320px"}
              overflow={"auto"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                  height: "4px"
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.grey[400],
                  borderRadius: "4px"
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: theme.palette.grey[600]
                }
              }}
            >
              {Object.keys(reflectionTemplateType).map((categoryKey) => (
                <Fragment key={categoryKey}>
                  <Button
                    onClick={() =>
                      onTemplateSelect(
                        categoryKey as keyof ReflectionTemplateType
                      )
                    }
                    sx={{
                      ...button,
                      borderRadius: "none",
                      letterSpacing: 0.8,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.contrastText
                      }
                    }}
                  >
                    {getReflectionTemplateName(
                      categoryKey as keyof ReflectionTemplateType
                    )}
                  </Button>
                  <Divider sx={{ borderColor: theme.palette.grey[400] }} />
                </Fragment>
              ))}
              <Button
                onClick={onClearContent}
                sx={{
                  ...button,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 2,
                  borderBottomLeftRadius: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.warning.main
                  }
                }}
              >
                リセット
                <Typography fontSize={10} color={theme.palette.grey[500]}>
                  ※ 文章内の全ての文字が削除されるのでご注意ください
                </Typography>
              </Button>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default ReflectionTemplatePopupArea;
