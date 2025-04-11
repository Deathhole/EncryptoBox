import firebase_admin
from firebase_admin import auth, credentials

# Initialize Firebase Admin SDK
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def assign_admin_role(uid):
    try:
        # Assign the admin role to the user
        auth.set_custom_user_claims(uid, {"admin": True})
        print(f"Admin role assigned to user with UID: {uid}")
    except Exception as e:
        print(f"Error assigning admin role: {e}")

# Replace 'USER_UID' with the UID of the user you want to make an admin
assign_admin_role("dU2Qwrcn3wZsv754OBd4oHPmQBZ2")