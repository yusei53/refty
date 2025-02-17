import { Box, Stack, Popper, Fade, Divider } from "@mui/material";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type SelectAITypePopupAreaProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onAITypeSelect: (type: 0 | 1 | 2 | 3) => void;
  AIType: 0 | 1 | 2 | 3 | null;
};

const button = {
  border: "none",
  display: "block",
  textAlign: "left",
  width: "100%"
};

export const SelectAITypePopupArea: React.FC<SelectAITypePopupAreaProps> = ({
  open,
  anchorEl,
  onClick,
  onClose,
  onAITypeSelect,
  AIType
}) => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        border={`1px solid ${theme.palette.grey[300]}`}
        borderRadius={8}
        px={2}
        py={1}
        mx={3}
        tabIndex={0}
        onClick={onClick}
        onBlur={onClose}
        sx={{
          "&:hover": {
            cursor: "pointer"
          }
        }}
      >
        {AIType === null && (
          <>
            <Box>👹</Box>
            <Box>👼</Box>
            <Box>👻</Box>
            <Box>👽</Box>
          </>
        )}
        {AIType === 0 && <Box>👹</Box>}
        {AIType === 1 && <Box>👼</Box>}
        {AIType === 2 && <Box>👻</Box>}
        {AIType === 3 && <Box>👽</Box>}
      </Stack>
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
              <Button
                onClick={() => onAITypeSelect(0)}
                sx={{
                  ...button,
                  borderRadius: "none",
                  letterSpacing: 0.8,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.contrastText
                  }
                }}
              >
                👹
              </Button>
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <Button
                onClick={() => onAITypeSelect(1)}
                sx={{
                  ...button,
                  borderRadius: "none",
                  letterSpacing: 0.8,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.contrastText
                  }
                }}
              >
                👼
              </Button>
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <Button
                onClick={() => onAITypeSelect(2)}
                sx={{
                  ...button,
                  borderRadius: "none",
                  letterSpacing: 0.8,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.contrastText
                  }
                }}
              >
                👻
              </Button>
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <Button
                onClick={() => onAITypeSelect(3)}
                sx={{
                  ...button,
                  borderRadius: "none",
                  letterSpacing: 0.8,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.contrastText
                  }
                }}
              >
                👽
              </Button>
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
