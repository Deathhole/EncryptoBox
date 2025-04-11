import os
import base64
import hashlib
from Cryptodome.Cipher import AES
from dotenv import load_dotenv
from Cryptodome.Util.Padding import unpad, pad
import struct

load_dotenv()

# Load secret key from environment variable
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set in .env")

# Convert secret key to 32-byte (AES-256 key)
def derive_key(password: str) -> bytes:
    salt = hashlib.sha256(password.encode()).digest()
    return hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000, dklen=32)

# AES-256-CBC Encryption
def encrypt_file(input_file: str, output_file: str, password: str):
    with open(input_file, "rb") as f:
        file_data = f.read()

    # Generate AES key from password
    key = hashlib.sha256(password.encode()).digest()

    # Generate a random IV
    iv = os.urandom(16)

    # Initialize AES cipher in CBC mode
    cipher = AES.new(key, AES.MODE_CBC, iv)

    # PKCS7 Padding
    pad_size = 16 - (len(file_data) % 16)
    file_data += bytes([pad_size] * pad_size)

    # Encrypt data
    encrypted_data = cipher.encrypt(file_data)

    # Save IV + encrypted data
    with open(output_file, "wb") as f:
        f.write(iv + encrypted_data)

# AES-256-GCM Decryption
def decrypt_file(input_file: str, output_file: str, password: str):
    try:
        with open(input_file, "rb") as f:
            file_data = f.read()

        if len(file_data) < 16:
            return False, "Invalid encrypted file format"

        # Extract IV (first 16 bytes)
        iv = file_data[:16]
        encrypted_data = file_data[16:]

        # Generate AES key from password
        key = hashlib.sha256(password.encode()).digest()

        # Initialize AES cipher in CBC mode
        cipher = AES.new(key, AES.MODE_CBC, iv)

        # Decrypt data
        decrypted_data = cipher.decrypt(encrypted_data)

        # Remove PKCS7 padding
        pad_size = decrypted_data[-1]

        if pad_size < 1 or pad_size > 16:
            return False, "Invalid padding. Incorrect password?"

        decrypted_data = decrypted_data[:-pad_size]  # Remove padding

        # Save decrypted data
        with open(output_file, "wb") as f:
            f.write(decrypted_data)

        return True, None

    except ValueError:
        return False, "❌ Incorrect password or corrupted file."
    except Exception as e:
        return False, f"Unexpected error: {str(e)}"