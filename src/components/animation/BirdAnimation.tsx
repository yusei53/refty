// FIXME:  use clientはつけたくないのであとで消す作業
"use client";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

export const BirdAnimation = () => {
  return (
    <>
      {birdConfigs.map((config, index) => (
        <Box
          key={index}
          position={"fixed"}
          width={"10px"}
          height={"10px"}
          left={"-1vw"}
          top={"var(--start-top)"}
          sx={{
            transform: "rotate(45deg)",
            "--start-top": config.startTop,
            animation: `${moving} 22s linear infinite`,
            animationDelay: config.mainDelay,
            "&:before": {
              content: '""',
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "black",
              transform: "rotate(-30deg)",
              transformOrigin: "right bottom",
              width: "100%",
              height: "1px",
              animation: `${leftWing} ${config.wingDuration} linear infinite`,
              animationDelay: config.wingDelay
            },
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "black",
              transform: "rotate(-30deg)",
              transformOrigin: "right bottom",
              width: "1px",
              height: "100%",
              animation: `${rightWing} ${config.wingDuration} linear infinite`,
              animationDelay: config.wingDelay
            }
          }}
        />
      ))}
    </>
  );
};

const birdConfigs = [
  {
    startTop: "25vh",
    mainDelay: "1s",
    wingDuration: "4s",
    wingDelay: "0s"
  },
  {
    startTop: "45vh",
    mainDelay: "12s",
    wingDuration: "4s",
    wingDelay: "1s"
  },
  {
    startTop: "60vh",
    mainDelay: "16s",
    wingDuration: "5s",
    wingDelay: "2s"
  },
  {
    startTop: "30vh",
    mainDelay: "24s",
    wingDuration: "6s",
    wingDelay: "3s"
  }
];

// NOTE: 横に移動するアニメーション
const moving = keyframes`
  0% {
    left: -0;
    top: var(--start-top);
  }
  100% {
    left: 100vw;
    top: var(--start-top);
  }
`;

// NOTE: 左翼のアニメーション
const leftWing = keyframes`
  0% { transform: rotate(-30deg); }
  2% { transform: rotate(-110deg); }
  4% { transform: rotate(-30deg); }
  6% { transform: rotate(-110deg); }
  8% { transform: rotate(-30deg); }
  10% { transform: rotate(-110deg); }
  12% { transform: rotate(-30deg); }
  100% { transform: rotate(-30deg); }
`;

// NOTE: 右翼のアニメーション
const rightWing = keyframes`
  0% { transform: rotate(30deg); }
  2% { transform: rotate(110deg); }
  4% { transform: rotate(30deg); }
  6% { transform: rotate(110deg); }
  8% { transform: rotate(30deg); }
  10% { transform: rotate(110deg); }
  12% { transform: rotate(30deg); }
  100% { transform: rotate(30deg); }
`;
