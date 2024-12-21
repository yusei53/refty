"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontSize: 13.5
  },
  palette: {
    // mainが背景色で、lightがaタグ, contrastTextがhover
    primary: { main: "#f0f7ff", light: "#0D83FD", contrastText: "#F7FAFC" },
    // 400がborder, 500がplaceholder, 600で文字色
    grey: { 400: "#ededed", 500: "#adb5bd" },
    // リセットボタンのhoverで使用
    warning: { main: "#FCECEC" }
  }
});
