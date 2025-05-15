// Example of a simple file encryption function using Web Crypto API

export const encryptFile = async (file: File, password: string) => {
  try {
    // Convert password to a key
    const encoder = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );

    // Read the file as an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Generate a random initialization vector (IV)
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM

    // Encrypt the file data
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      passwordKey,
      arrayBuffer
    );

    // Convert the encrypted ArrayBuffer to a Blob
    const encryptedBlob = new Blob([iv, encryptedBuffer]);

    // Return the encrypted file as a Blob
    return encryptedBlob;
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Encryption failed");
  }
};
