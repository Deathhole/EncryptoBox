// src/app/pages/Decrypt.tsx
import React, { useContext } from "react";
import { Box, CssBaseline } from "@mui/material";
import DecryptComponent from "../../components/DecryptComponent";
import { ColorModeContext } from "../theme/theme";
import { useTheme, ThemeProvider } from "@mui/material/styles";

const Decrypt: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>
        <CssBaseline />
        <Box p={3}>
          <DecryptComponent />
        </Box>
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
};

export default Decrypt;
