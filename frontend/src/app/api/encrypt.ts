import axios from "axios";

const API_URL = "https://encryptobox-backend-production.up.railway.app/api/encrypt"; // Updated the endpoint

export const encryptFile = async (file: File, password: string): Promise<Blob | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);
  
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        credentials: "include", // Include credentials for CORS
      });
  
      if (!response.ok) {
        throw new Error("Encryption failed. Please try again.");
      }
  
      // Get the encrypted file as a Blob
      return await response.blob();
    } catch (error) {
      console.error("Encryption Error:", error);
      return null;
    }
  };
  
