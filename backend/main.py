from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth_middleware import AuthMiddleware 
from routes.encrypt import router as encrypt_router
from routes.decrypt import router as decrypt_router
from routes.admin import admin_router

app = FastAPI(title="File Encryption & Decryption API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

# Include Routes
app.include_router(encrypt_router, prefix="/api")
app.include_router(decrypt_router, prefix="/api")
app.include_router(admin_router, prefix="/api")



@app.get("/")
def read_root():
    return {"message": "Backend is running"}
