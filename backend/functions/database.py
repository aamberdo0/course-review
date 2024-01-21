import pymongo
import dotenv
import os

dotenv.load_dotenv()


def add_course(course_data: dict):
    client = pymongo.MongoClient(os.environ["MONGO_URI"])
    collectionName = "courses"
    database = "university"
    response = client[database][collectionName].insert_one(course_data)
    print(response.acknowledged)
    client.close()
    return response.acknowledged


def update_course(course_data: dict):
    client = pymongo.MongoClient(os.environ["MONGO_URI"])
    collectionName = "courses"
    database = "university"
    response = client[database][collectionName].update_one({'course_code': course_data['$set']['course_code']}, course_data)
    print(response.acknowledged)
    client.close()
    return response.acknowledged


def add_review(course_code: str, review_data: dict):
    client = pymongo.MongoClient(os.environ["MONGO_URI"])
    collectionName = "courses"
    database = "university"
    response = client[database][collectionName].update_one({'course_code': course_code}, review_data)
    print(response.acknowledged)
    client.close()
    return response.acknowledged
