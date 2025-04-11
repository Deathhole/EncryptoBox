// src/api/encryptDecryptService.ts

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Encrypt API call
export const encryptData = async (data: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/encrypt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Encryption failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error encrypting data:", error);
  }
};

// Decrypt API call
export const decryptData = async (data: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/decrypt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Decryption failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error decrypting data:", error);
  }
};
