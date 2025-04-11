import { createContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = (): [ReturnType<typeof createTheme>, { toggleColorMode: () => void }] => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "#0d0d0d",
                  paper: "#111",
                },
                primary: {
                  main: "#ff1744", // red accent
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#aaaaaa",
                },
              }
            : {
                background: {
                  default: "#f4f4f4",
                  paper: "#ffffff",
                },
                primary: {
                  main: "#d50000",
                },
                text: {
                  primary: "#000000",
                  secondary: "#444444",
                },
              }),
        },
        typography: {
          fontFamily: "Poppins, sans-serif",
        },
      }),
    [mode]
  );

  return [theme, colorMode];
};
