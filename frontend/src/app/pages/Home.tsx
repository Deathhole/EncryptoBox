// src/app/pages/Home.tsx
import React, { useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  useMediaQuery,
  Grow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../theme/theme";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Home: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>
        <Box
          sx={{
            position: "relative",
            minHeight: "100vh",
            backgroundImage: `url("/images/image.jpg")`,  // <-- public folder path here
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: { xs: 6, sm: 10 },
            px: { xs: 2, sm: 4 },
            color: theme.palette.text.primary,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              zIndex: 1,
              backdropFilter: "blur(4px)",
            },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              maxWidth: 1100,
              width: "100%",
              color: theme.palette.text.primary,
            }}
          >
            {/* Hero Section */}
            <Typography
              variant={isSmallScreen ? "h4" : "h3"}
              color="primary.main"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
              sx={{
                textShadow: "0 0 10px rgba(255, 23, 68, 0.8)",
                caretColor: "transparent",
                userSelect: "text",
              }}
            >
              Welcome to EncryptoBox
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              textAlign="center"
              mb={6}
              sx={{
                maxWidth: 600,
                mx: "auto",
                fontWeight: 500,
                caretColor: "transparent",
                userSelect: "text",
              }}
            >
              Encrypt and decrypt your files securely with style. Navigate
              using the cards below:
            </Typography>

            {/* Encrypt/Decrypt Cards */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="center"
              gap={4}
              mb={8}
            >
              {[
                {
                  title: "Encrypt Files",
                  icon: <LockIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />,
                  description:
                    "Secure your files using powerful encryption algorithms.",
                  actionText: "Go to Encrypt",
                  onClick: () => navigate("/encrypt"),
                },
                {
                  title: "Decrypt Files",
                  icon: <LockOpenIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />,
                  description:
                    "Upload encrypted files and unlock them using your password.",
                  actionText: "Go to Decrypt",
                  onClick: () => navigate("/decrypt"),
                },
              ].map((card, index) => (
                <Grow
                  key={card.title}
                  in={true}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(index === 0 ? { timeout: 700 } : { timeout: 1000 })}
                >
                  <Card
                    sx={{
                      flex: 1,
                      height: "100%",
                      backgroundColor: theme.palette.background.paper,
                      borderLeft: `8px solid ${theme.palette.primary.main}`,
                      boxShadow: `0 8px 16px ${theme.palette.primary.main}22`,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 12px 24px ${theme.palette.primary.main}44`,
                      },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 3,
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        mb={1}
                        display="flex"
                        alignItems="center"
                        color="primary.main"
                        sx={{
                          caretColor: "transparent",
                          userSelect: "text",
                        }}
                      >
                        {card.icon}
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={3}
                        sx={{
                          caretColor: "transparent",
                          userSelect: "text",
                        }}
                      >
                        {card.description}
                      </Typography>
                    </CardContent>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={card.onClick}
                      size="large"
                      sx={{ mt: "auto" }}
                    >
                      {card.actionText}
                    </Button>
                  </Card>
                </Grow>
              ))}
            </Box>

            {/* Trust Badges */}
            <Box
              display="flex"
              justifyContent="center"
              gap={6}
              mb={8}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "1rem",
                opacity: 0.85,
              }}
            >
              <Typography
                sx={{ caretColor: "transparent", userSelect: "text" }}
              >
                🔐 GDPR Compliant
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ borderColor: theme.palette.primary.main }} />
              <Typography
                sx={{ caretColor: "transparent", userSelect: "text" }}
              >
                ✅ AES-256 Encryption
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ borderColor: theme.palette.primary.main }} />
              <Typography
                sx={{ caretColor: "transparent", userSelect: "text" }}
              >
                🛡️ Zero Knowledge Privacy
              </Typography>
            </Box>

            {/* User Testimonials */}
            <Box
              maxWidth={650}
              mx="auto"
              textAlign="center"
              color="text.primary"
              mb={10}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ caretColor: "transparent", userSelect: "text" }}
              >
                What Our Users Say
              </Typography>
              <Typography
                variant="body1"
                fontStyle="italic"
                mb={1}
                color="text.secondary"
                sx={{ caretColor: "transparent", userSelect: "text" }}
              >
                "EncryptoBox made securing my confidential files effortless and
                fast!"
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="medium"
                sx={{ caretColor: "transparent", userSelect: "text" }}
              >
                — Jamie L., Security Analyst
              </Typography>
            </Box>

            {/* Step-by-Step Process */}
            <Box
              maxWidth={700}
              mx="auto"
              textAlign="center"
              color="text.secondary"
              mb={10}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                gutterBottom
                sx={{ caretColor: "transparent", userSelect: "text" }}
              >
                How It Works
              </Typography>
              <Box
                display="flex"
                justifyContent="space-around"
                flexWrap="wrap"
                gap={4}
                mt={3}
              >
                {[
                  {
                    step: "1. Upload",
                    description: "Choose your files to encrypt or decrypt.",
                  },
                  {
                    step: "2. Encrypt / Decrypt",
                    description: "Use our secure algorithm with your password.",
                  },
                  {
                    step: "3. Download",
                    description: "Get your secured or restored files instantly.",
                  },
                ].map(({ step, description }) => (
                  <Box
                    key={step}
                    flex={1}
                    minWidth={180}
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 2,
                      p: 3,
                      boxShadow: `0 6px 12px ${theme.palette.primary.main}22`,
                      transition: "box-shadow 0.3s ease",
                      "&:hover": {
                        boxShadow: `0 12px 24px ${theme.palette.primary.main}44`,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      mb={1}
                      color={theme.palette.primary.main}
                      fontWeight="bold"
                      sx={{ caretColor: "transparent", userSelect: "text" }}
                    >
                      {step}
                    </Typography>
                    <Typography
                      sx={{ caretColor: "transparent", userSelect: "text" }}
                    >
                      {description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Security Tips */}
            <Box
              maxWidth={700}
              mx="auto"
              color="text.secondary"
              mb={10}
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: 4,
                borderRadius: 2,
                boxShadow: `0 8px 20px ${theme.palette.primary.main}22`,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                gutterBottom
                textAlign="center"
                mb={3}
                sx={{ caretColor: "transparent", userSelect: "text" }}
              >
                Security Tips
              </Typography>
              <Box component="ul" sx={{ pl: 4, m: 0 }}>
                <li>Use strong, unique passwords.</li>
                <li>Never share your encryption keys.</li>
                <li>Always keep backups of your encrypted files.</li>
              </Box>
            </Box>

            {/* FAQ Section */}
            <Box
              maxWidth={700}
              mx="auto"
              color="text.secondary"
              mb={10}
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: 4,
                borderRadius: 2,
                boxShadow: `0 8px 20px ${theme.palette.primary.main}22`,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                gutterBottom
                sx={{ caretColor: "transparent", userSelect: "text" }}
              >
                Frequently Asked Questions
              </Typography>
              <Box component="dl" sx={{ m: 0 }}>
                <Typography
                  component="dt"
                  fontWeight="bold"
                  mb={1}
                  sx={{ caretColor: "transparent", userSelect: "text" }}
                >
                  Is my data stored on your servers?
                </Typography>
                <Typography
                  component="dd"
                  mb={3}
                  sx={{ caretColor: "transparent", userSelect: "text" }}
                >
                  No, all encryption and decryption happen locally in your
                  browser.
                </Typography>

                <Typography
                  component="dt"
                  fontWeight="bold"
                  mb={1}
                  sx={{ caretColor: "transparent", userSelect: "text" }}
                >
                  What encryption algorithm do you use?
                </Typography>
                <Typography
                  component="dd"
                  mb={3}
                  sx={{ caretColor: "transparent", userSelect: "text" }}
                >
                  We use AES-256, one of the most secure standards available.
                </Typography>
              </Box>
            </Box>

            {/* Call to Action */}
            <Box textAlign="center" mb={6}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => navigate("/signup")}
              >
                Get Started Now
              </Button>
            </Box>
          </Box>
        </Box>
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
};

export default Home;
