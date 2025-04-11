# routes/admin.py
from fastapi import APIRouter

admin_router = APIRouter()

@admin_router.get("/admin")
def get_admin():
    return {"message": "Welcome to the Admin Panel"}
