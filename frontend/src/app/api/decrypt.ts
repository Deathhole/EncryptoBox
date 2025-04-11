import { toast } from "react-toastify";

export const decryptFile = async (file: File, password: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("password", password);

  try {
    toast.info("Decrypting file... 🔓");

    const response = await fetch("https://encryptobox-backend-production.up.railway.app/api/decrypt", { // Updated the endpoint 
      method: "POST",
      body: formData, // No need to set headers, FormData handles it
    });

    if (!response.ok) {
      throw new Error("Decryption failed! ❌");
    }

    // Create a downloadable file link
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file.name.replace(".enc", ""); // Remove .enc extension
    document.body.appendChild(a);
    a.click();
    a.remove();

    toast.success("File decrypted successfully! ✅");
  } catch (error) {
    toast.error("Error: " + error.message);
  }
};
