from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Simulated user (can be replaced with token-based logic later)
        user_info = {
            "username": "user123",
            "role": "user"  # Change to "admin" for admin routes
        }

        request.state.user = user_info
        return await call_next(request)

# Updated verify_auth to allow users
async def verify_auth(request: Request):
    user = getattr(request.state, "user", None)
    if user is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Allow both users and admins
    if user.get("role") in ["user", "admin"]:
        return user
    
    raise HTTPException(status_code=403, detail="Forbidden")
