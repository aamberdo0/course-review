from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from functions.autocomplete import query_complete
from functions.database import add_course, update_course, add_review

app = FastAPI()

origins = ["*"]
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


class Search(BaseModel):
  query: str
  school: Optional[str] = None


class Course(BaseModel):
  course_code: str
  course_title: str
  location: str
  description: str
  evaluation: dict
  workload: dict


class Review(BaseModel):
  course_code: str
  name: str
  year: int
  major: str
  review: str
  upvotes: int
  downvotes: int
  rating: float
  email: Optional[str] = None


@app.get("/")
async def root():
  return {"message": "Hello World"}


@app.post("/search")
async def search_complete(search_obj: Search):
  return {"response": query_complete(search_obj.query, search_obj.school)}


@app.post("/insert_course")
async def insert_course(course_obj: Course):
  course_dict = {
    "course_code": course_obj.course_code,
    "course_title": course_obj.course_title,
    "location": course_obj.location,
    "description": course_obj.description,
    "evaluation": course_obj.evaluation,
    "workload": course_obj.workload
  }
  return {"response": add_course(course_dict)}


@app.post("/update_course")
async def course_update(course_obj: Course):
  course_dict = {
    "$set": {
      "course_code": course_obj.course_code,
      "course_title": course_obj.course_title,
      "location": course_obj.location,
      "description": course_obj.description,
      "evaluation": course_obj.evaluation,
      "workload": course_obj.workload
    }
  }
  return {"response": update_course(course_dict)}


@app.post("/insert_review")
async def insert_review(review_obj: Review):
  review_dict = {
    "$push": {
      "reviews": {
        "name": review_obj.name,
        "rating": review_obj.rating,
        "major": review_obj.major,
        "year": review_obj.year,
        "review": review_obj.review,
        "upvotes": review_obj.upvotes,
        "downvotes": review_obj.downvotes
      }
    }
  }
  if not review_obj.email is None:
    review_dict['$push']['reviews']['email'] = review_obj.email
  return {"response": add_review(review_obj.course_code, review_dict)}
