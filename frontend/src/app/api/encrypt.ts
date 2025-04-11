// src/api/encrypt.ts
const API_URL = "https://encryptobox-backend-production.up.railway.app/api/encrypt";

export const encryptFile = async (
  file: File,
  password: string
): Promise<Blob | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
      credentials: "include", // Only if your backend supports credentials
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Encryption failed: ${response.status} - ${errorText}`);
    }

    return await response.blob();
  } catch (error: any) {
    console.error("Encryption Error:", error.message);
    return null;
  }
};
