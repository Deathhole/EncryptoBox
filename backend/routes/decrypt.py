import os
from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import FileResponse
from utils.encryption_utils import decrypt_file

router = APIRouter()

# Define directories
UPLOADS_DIR = "uploads"
DECRYPTED_DIR = "decrypted_files"

# Ensure directories exist
os.makedirs(UPLOADS_DIR, exist_ok=True)
os.makedirs(DECRYPTED_DIR, exist_ok=True)

@router.post("/decrypt")
async def decrypt_endpoint(file: UploadFile = File(...), password: str = Form(...)):
    try:
        # Define file paths
        input_path = os.path.join(UPLOADS_DIR, file.filename)
        decrypted_path = os.path.join(DECRYPTED_DIR, f"{file.filename}.dec")

        # Save uploaded encrypted file
        with open(input_path, "wb") as f:
            f.write(await file.read())

        # Decrypt
        decrypt_file(input_path, decrypted_path, password)

        return FileResponse(
            decrypted_path,
            filename=f"{file.filename}.dec",
            media_type="application/octet-stream"
        )

    except Exception as e:
        return {"error": str(e)}
