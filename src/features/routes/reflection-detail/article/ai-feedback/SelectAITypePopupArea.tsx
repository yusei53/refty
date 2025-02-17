import { Box, Stack, Popper, Fade } from "@mui/material";
import { SelectAIButton } from "./SelectAIButton";
import { theme } from "@/src/utils/theme";

type SelectAITypePopupAreaProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onAITypeSelect: (type: 0 | 1 | 2 | 3) => void;
  AIType: 0 | 1 | 2 | 3 | null;
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
        ml={3}
        mr={1}
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
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={0}
                emoji="👹"
                detail="鬼コーチです"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={1}
                emoji="👼"
                detail="ほげほげ"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={2}
                emoji="👻"
                detail="foo"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={3}
                emoji="👽"
                detail="ふがふが"
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
