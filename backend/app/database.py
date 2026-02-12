from pymongo import MongoClient

MONGO_URL = "mongodb+srv://careeruser:utkarsh16@cluster0.xqnmwxy.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URL)
db = client["careerforge"]
print("MongoDB connected")