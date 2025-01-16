"use client";
import ReactSnowFall from "react-snowfall";

export const Snowfall = () => {
  const now = new Date();
  const month = now.getMonth(); // NOTE: 0-based, 12月は11
  const day = now.getDate();

  const isInSnowPeriod = month === 11 && day >= 17 && day <= 27;

  if (!isInSnowPeriod) {
    return null;
  }

  return (
    <ReactSnowFall
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh"
      }}
      radius={[1.4, 1.8]}
      snowflakeCount={48}
    />
  );
};
