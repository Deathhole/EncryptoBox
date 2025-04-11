import axios from "axios";

const API_URL = "http://localhost:8000/api/encrypt";

export const encryptFile = async (file: File, password: string): Promise<Blob | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);
  
      const response = await fetch("http://127.0.0.1:8000/api/encrypt", {
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
  
