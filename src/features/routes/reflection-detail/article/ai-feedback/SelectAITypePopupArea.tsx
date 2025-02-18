import { Box, Popper, Fade } from "@mui/material";
import { SelectAIButton } from "./SelectAIButton";
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
      <Button
        variant="outlined"
        onClick={onClick}
        onBlur={onClose}
        sx={{ mx: 2 }}
      >
        {AIType === null && (
          <>
            <Box mx={1}>👹</Box>
            <Box mx={1}>👼</Box>
            <Box mx={1}>👻</Box>
            <Box mx={1}>👽</Box>
          </>
        )}
        {AIType === 0 && <Box>👹　鬼コーチ</Box>}
        {AIType === 1 && <Box>👼　ほげほげ</Box>}
        {AIType === 2 && <Box>👻　foo</Box>}
        {AIType === 3 && <Box>👽　ふがふが</Box>}
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
