"use client";
export const BirdAnimation: React.FC = () => {
  return (
    <>
      <div className="bird"></div>
      <div className="bird -type_2"></div>
      <div className="bird -type_3"></div>
      <div className="bird -type_4"></div>
      <style jsx>{`
        .bird {
          position: fixed;
          width: 10px;
          height: 10px;
          transform: rotate(45deg);
          /* 各鳥の開始位置（画面上部の高さ） */
          --start-top: 25vh;
          /* アニメーション全体は22秒 */
          animation: moving 22s linear infinite;
          animation-delay: 1s;
        }
        .bird.-type_2 {
          --start-top: 45vh;
          animation-delay: 15s;
        }
        .bird.-type_3 {
          --start-top: 60vh;
          animation-delay: 18s;
        }
        .bird.-type_4 {
          --start-top: 30vh;
          animation-delay: 27s;
        }
        /* シンプルに左右を線形に移動（一定速度） */
        @keyframes moving {
          0% {
            left: -2vw;
            top: var(--start-top);
          }
          100% {
            left: 101vw;
            top: var(--start-top);
          }
        }
        /* 以下、翼のアニメーション（パタパタ） */
        .bird:before,
        .bird:after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: black;
          transform: rotate(-30deg);
          transform-origin: right bottom;
        }
        .bird:before {
          width: 100%;
          height: 1px;
          animation: leftWing 6s linear infinite;
        }
        .bird:after {
          width: 1px;
          height: 100%;
          animation: rightWing 6s linear infinite;
        }
        @keyframes leftWing {
          0% {
            transform: rotate(-30deg);
          }
          2% {
            transform: rotate(-110deg);
          }
          4% {
            transform: rotate(-30deg);
          }
          6% {
            transform: rotate(-110deg);
          }
          8% {
            transform: rotate(-30deg);
          }
          10% {
            transform: rotate(-110deg);
          }
          12% {
            transform: rotate(-30deg);
          }
          100% {
            transform: rotate(-30deg);
          }
        }
        @keyframes rightWing {
          0% {
            transform: rotate(30deg);
          }
          2% {
            transform: rotate(110deg);
          }
          4% {
            transform: rotate(30deg);
          }
          6% {
            transform: rotate(110deg);
          }
          8% {
            transform: rotate(30deg);
          }
          10% {
            transform: rotate(110deg);
          }
          12% {
            transform: rotate(30deg);
          }
          100% {
            transform: rotate(30deg);
          }
        }
        /* 各鳥の翼の動きを個別にずらす */
        .bird.-type_2:before,
        .bird.-type_2:after {
          animation-delay: 1s;
        }
        .bird.-type_3:before,
        .bird.-type_3:after {
          animation-delay: 2s;
        }
        .bird.-type_4:before,
        .bird.-type_4:after {
          animation-delay: 3s;
        }
      `}</style>
    </>
  );
};
