import React from "react";
import { Container, Typography, Divider, Box } from "@mui/material";

const PrivacyPolicy: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 8,
        mb: 12,
        color: "#ccc",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#ff1744", letterSpacing: 2 }}
      >
        Privacy Policy
      </Typography>

      <Divider
        sx={{ borderColor: "#ff1744", mb: 4, width: 100, borderWidth: 2 }}
      />

      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
        Your privacy is very important to us at EncryptoBox. This Privacy Policy
        explains how we collect, use, and protect your personal information when
        you use our services.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        Information We Collect
      </Typography>
      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
        We may collect personal information such as your name, email address, and
        usage data when you register or interact with our platform.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        How We Use Your Information
      </Typography>
      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
        Your information is used solely to provide and improve our services,
        communicate important updates, and ensure the security of your data.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        Data Security
      </Typography>
      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
        We implement strong encryption and security measures to protect your
        data from unauthorized access.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        Sharing Your Information
      </Typography>
      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
        We do not sell, trade, or rent your personal information to third parties.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        Changes to This Policy
      </Typography>
      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
        We may update this Privacy Policy from time to time. Any changes will be
        posted here with an updated effective date.
      </Typography>

      <Typography variant="body1" paragraph sx={{ mt: 6 }}>
        If you have any questions or concerns about this policy, please contact us
        at <Box component="span" sx={{ color: "#ff1744", fontWeight: "bold" }}>encryptobox@gmail.com</Box>.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
