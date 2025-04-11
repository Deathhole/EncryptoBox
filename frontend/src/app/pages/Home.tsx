// src/app/pages/Home.tsx
import React, { useContext } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../theme/theme";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Home: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>
        <Box
          sx={{
            height: "100vh",
            backgroundImage:
              "url('/images/image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            p: 4,
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            🔐 Welcome to EncryptoBox
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Encrypt and decrypt your files securely with style. Navigate using the cards below:
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderLeft: `6px solid ${theme.palette.primary.main}`,
                  boxShadow: "0 4px 20px rgba(255, 23, 68, 0.1)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <LockIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                    Encrypt Files
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Secure your files using powerful encryption algorithms.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => navigate("/encrypt")}>
                    Go to Encrypt
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderLeft: `6px solid ${theme.palette.primary.main}`,
                  boxShadow: "0 4px 20px rgba(255, 23, 68, 0.1)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <LockOpenIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                    Decrypt Files
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Upload encrypted files and unlock them using your password.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => navigate("/decrypt")}>
                    Go to Decrypt
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
};

export default Home;
