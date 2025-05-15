import React from "react";

const EncryptoBoxLogo: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shield Background */}
    <path
      d="M32 2L58 14V32C58 46 46 58 32 62C18 58 6 46 6 32V14L32 2Z"
      fill="#1F1F1F"
      stroke="#FF1744"
      strokeWidth="3"
    />
    {/* Lock Body */}
    <rect x="24" y="28" width="16" height="16" rx="2" fill="#FF1744" />
    {/* Lock Shackle */}
    <path
      d="M28 28V22C28 19.8 29.8 18 32 18C34.2 18 36 19.8 36 22V28"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default EncryptoBoxLogo;
