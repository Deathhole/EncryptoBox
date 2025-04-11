import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth_middleware import AuthMiddleware 
from routes.encrypt import router as encrypt_router
from routes.decrypt import router as decrypt_router
from routes.admin import admin_router

app = FastAPI(title="File Encryption & Decryption API", version="1.0.0")

# CORS: allow frontend from Vercel + local dev
origins = [
    "http://localhost:5173",                 # Dev
    "https://encrypto-box.vercel.app"        # Production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional: Auth Middleware (if you use it)
app.add_middleware(AuthMiddleware)

# Include Routes
app.include_router(encrypt_router, prefix="/api")
app.include_router(decrypt_router, prefix="/api")
app.include_router(admin_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Backend is running"}

# Uvicorn runner (important for Railway)
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
