// src/api/decrypt.ts
import { toast } from "react-toastify";

export const decryptFile = async (file: File, password: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("password", password);

  try {
    toast.info("Decrypting file... 🔓");

    const response = await fetch(
      "https://encryptobox-backend-production.up.railway.app/api/decrypt",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Decryption failed! ❌ ${response.status} - ${errorText}`
      );
    }

    const blob = await response.blob();

    if (blob.size === 0) {
      toast.error("Incorrect password or empty file. ❌");
      return;
    }

    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file.name.endsWith(".enc")
      ? file.name.replace(/\.enc$/i, "")
      : `decrypted_${file.name}`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    toast.success("File decrypted successfully! ✅");
  } catch (error: any) {
    toast.error("Error: " + error.message);
  }
};
