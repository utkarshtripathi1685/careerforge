from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from app.database import db
from app.schemas.user import UserCreate

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

@router.post("/register")
def register(user: UserCreate):
    existing = db.users.find_one({"email": user.email})

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "skills": user.skills
    }

    db.users.insert_one(new_user)

    return {"message": "User registered successfully"}
