from pydantic import BaseModel, EmailStr
from typing import List, Optional

class User(BaseModel):
    name: str
    email : EmailStr
    password: str
    skills: Optional[List[str]]=[]