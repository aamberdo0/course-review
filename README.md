# CourSavvy

A search engine helps user to give into the world of courses. 

## Inspiration 🌟
Course enrolment is stressful, and picking the right courses is even harder, specially with financial deadlines and missed lectures. 
 We wanted to create a website to **crowdsource information** about courses to remove a stress from a student's life and to **connect with alumni** .

## What it does 🚀
CourSavvy is a search engine that collects course reviews from students at various post-secondary institutions. Users share feedback on aspects like reading, writing, and presentations, providing additional information on assessments and grading weight. Optionally, students can include their email addresses for potential future contact regarding the courses

## [Live Demo]
https://github.com/aamberdo0/course-review/assets/122891092/07ab842a-e039-4d37-9ae6-885ff0f317cd

## How we built it 🔧
The frontend was built using `Angular`. The backend we used `MongoDB`,`FastAPI` with search indexes to index the course codes and titles. This allows us to autocomplete and suggest courses based on what the user typed into the search box, which is hosted on `Render` after being containerized.

## Challenges we ran into 🤯
- MongoDB's autocomplete schema was confusing and combining different criteria proved challenging. 
- Requests would respond empty, or with long error traces. 
- Server went fault where if we returned the ID of the object with FastAPI.

## Accomplishments that we're proud of 🏆
- The autocomplete works well and fast. 
- Teamwork

## What we learned 🧠
- How to create search indexes and do autocomplete in search boxes.
- Some of our team members learned how to push content on Github. 

## What's next for CourSavvy 🚗
- Add user authentication to save details and modify their reviews. 🔐
- Add a chatbot for student to have access to courses suggestions.

## Development server
Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.