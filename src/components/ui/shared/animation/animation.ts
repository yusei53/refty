import { keyframes } from "@mui/material";

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

export const animation = (index: number) => ({
  opacity: 0,
  animation: `${fadeIn} 0.4s ease-out forwards`,
  animationDelay: `${index * 50}ms`,
});
