// src/pages/About.tsx
import React from "react";
import { Box, Typography, Container, Divider, Avatar } from "@mui/material";

const teamMembers = [
  {
    name: "Pruthvi MP",
    role: "Founder & CEO",
    photo: "/team/pruthvi.jpg",
  },
  {
    name: "Rahul J",
    role: "Lead Developer",
    photo: "/team/rahul.jpg",
  },
  {
    name: "Varun K",
    role: "UI/UX Designer",
    photo: "/team/varun.jpg",
  },
  {
    name: "Yogesh N",
    role: "Security Expert",
    photo: "/team/yogesh.jpg",
  },
];

const About: React.FC = () => {
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
        sx={{ color: "#ff1744", letterSpacing: 2, caretColor: "transparent", userSelect: "text" }}
      >
        About EncryptoBox
      </Typography>

      <Divider
        sx={{ borderColor: "#ff1744", mb: 4, width: 80, borderWidth: 2 }}
      />

      <Typography
        variant="body1"
        paragraph
        sx={{ lineHeight: 1.8, caretColor: "transparent", userSelect: "text" }}
      >
        EncryptoBox is a secure, user-friendly platform designed to help you
        protect your digital files with robust encryption and easy decryption.
        We prioritize your privacy and data security, ensuring that your
        information stays safe from unauthorized access.
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{ lineHeight: 1.8, caretColor: "transparent", userSelect: "text" }}
      >
        Our mission is to make encryption accessible to everyone — no matter
        your technical background. Whether you're a casual user wanting to keep
        personal files private, or a professional handling sensitive data,
        EncryptoBox is built for you.
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{ lineHeight: 1.8, caretColor: "transparent", userSelect: "text" }}
      >
        With a sleek interface and powerful encryption algorithms, we aim to
        provide peace of mind in an increasingly digital world. Thank you for
        trusting EncryptoBox to safeguard your privacy.
      </Typography>

      <Box mt={6} textAlign="center">
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ caretColor: "transparent", userSelect: "text" }}
        >
          Our Team
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 6,
            mt: 2,
          }}
        >
          {teamMembers.map(({ name, role, photo }) => (
            <Box
              key={name}
              sx={{
                width: 140,
                textAlign: "center",
              }}
            >
              <Avatar
                alt={name}
                src={photo}
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                  border: "3px solid #ff1744",
                }}
              />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ mt: 1, color: "#ff1744", caretColor: "transparent", userSelect: "text" }}
              >
                {name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#aaa", caretColor: "transparent", userSelect: "text" }}
              >
                {role}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box mt={6} textAlign="center">
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ caretColor: "transparent", userSelect: "text" }}
        >
          Our Values
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#aaa", fontStyle: "italic", caretColor: "transparent", userSelect: "text" }}
        >
          Privacy • Security • Simplicity • Trust
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
