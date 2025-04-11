import os
from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import FileResponse
from utils.encryption_utils import encrypt_file

router = APIRouter()

# Define directories
UPLOADS_DIR = "uploads"
ENCRYPTED_DIR = "encrypted_files"

# Ensure directories exist
os.makedirs(UPLOADS_DIR, exist_ok=True)
os.makedirs(ENCRYPTED_DIR, exist_ok=True)

@router.post("/encrypt")
async def encrypt_endpoint(
    file: UploadFile = File(...),
    password: str = Form(...)
):
    try:
        # Define file paths
        input_path = os.path.join(UPLOADS_DIR, file.filename)
        encrypted_path = os.path.join(ENCRYPTED_DIR, f"{file.filename}.enc")

        # Save the uploaded file
        with open(input_path, "wb") as f:
            f.write(await file.read())

        # Encrypt the file
        encrypt_file(input_path, encrypted_path, password)

        # Return the encrypted file as a downloadable response
        return FileResponse(
            encrypted_path,
            filename=f"{file.filename}.enc",
            media_type="application/octet-stream"
        )

    except Exception as e:
        return {"error": str(e)}
