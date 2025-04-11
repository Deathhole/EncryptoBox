const API_URL = import.meta.env.VITE_API_BASE + "/api/encrypt";

export const encryptFile = async (file: File, password: string): Promise<Blob | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
      // Remove credentials unless you're using session cookies
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
