# Candidate-Referral-management-system

Live Links:

Frontend (Live App):
https://candidate-referral-management-syste-nine.vercel.app/

Backend API:
https://candidate-referral-management-system-48zx.onrender.com

Source Code (GitHub):
https://github.com/manojgit18/Candidate-Referral-management-system


The application allows users to refer candidates, manage their status, and view all referrals through a simple dashboard.

The project is built using the MERN stack:

MongoDB

Express.js

React (Vite)

Node.js

Features Implemented
Frontend (React)
Dashboard

Displays a list of all referred candidates

Each candidate card shows:

Name

Job Title

Email

Phone

Status

Search functionality to filter candidates by job title

Filter by status (Pending / Reviewed / Hired)

Referral Form

Form to refer a new candidate

Required fields:

Candidate Name

Email

Phone Number

Job Title

Optional resume upload (.pdf only, max 2MB)

On submission, a POST request is sent to the backend

Update Candidate Status

Dropdown provided in each candidate card

Allows status update from:

Pending → Reviewed → Hired

Updates are reflected immediately after API response

Delete Candidate

Delete button on each card

Confirmation before deletion

State management is handled using React Hooks:

useState

useEffect

Redux was not used since the application state is small and manageable using hooks.

Backend (Node.js + Express)
API Endpoints

GET /candidates
Fetch all referred candidates

POST /candidates
Save a new candidate (multipart/form-data)

PUT /candidates/:id/status
Update the status of a candidate

DELETE /candidates/:id
Delete a candidate

Database

MongoDB (Atlas) is used to store candidate details.

Each candidate document contains:

Name

Email

Phone

Job Title

Status

Resume File URL (if uploaded)

CreatedAt and UpdatedAt timestamps

Validation
Backend Validation

Email format validation

Phone number validation

Resume restricted to .pdf files

File size limit (2MB)

Error Handling

Proper HTTP status codes returned

Meaningful error messages for invalid input or server errors