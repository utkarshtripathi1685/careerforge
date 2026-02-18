from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from app.database import db
from app.schemas.user import UserCreate
from app.routes.jwt import create_access_token

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def hash_password(password):
    return pwd_context.hash(password)

@router.post("/register")
def register(user: UserCreate):
    if db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")

    db.users.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "skills": user.skills,
        "role": "student"
    })


    return {"message": "User registered successfully"}

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    user = db.users.find_one({"email": form_data.username})

    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token({
        "email": user["email"],
        "role": user.get("role", "student")
    })

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


from app.routes.deps import get_current_user
from fastapi import Depends

@router.get("/profile")
def profile(user=Depends(get_current_user)):
    return {
        "email": user["email"],
        "role": user["role"]
    }

