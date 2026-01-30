<h1 align="center">💼 AI Job Portal</h1>
<h3 align="center">Full Stack MERN Application with AI Resume Scoring & Rewriting</h3>

---

## 👨‍💻 About Me
I am an MCA student and Full Stack Developer specializing in the MERN stack. I enjoy building scalable web applications and integrating AI-powered features to solve real-world problems. This project demonstrates my skills in full-stack development, authentication, resume parsing, AI integration, and PDF generation.

---

## 🚀 Project Overview
The **AI Job Portal** is a full-featured recruitment platform where:

- Users can browse jobs and apply
- Recruiters can post jobs
- Users can upload resumes
- AI analyzes resumes for job matching
- AI rewrites resumes for better ATS optimization
- Resumes can be downloaded as PDF

---

## ✨ Key Features
✔ User & Recruiter Authentication  
✔ Job Posting & Job Applications  
✔ Resume Upload System  
✔ AI Resume Score Preview  
✔ AI Resume Rewrite  
✔ Resume PDF Generation  
✔ Save Jobs Feature  
✔ Recruiter Dashboard  
✔ Secure JWT Authentication  
✔ Role-Based Access Control  

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### AI Integration
- Google Gemini API
- Resume Text Extraction
- AI Resume Scoring
- AI Resume Rewriting

### PDF Generation
- Puppeteer

---

## 📂 Project Structure
client/ → React frontend
server/ → Node backend
models/ → MongoDB schemas
controllers/ → Business logic
services/ → AI & PDF services
middlewares/ → Authentication & rate limiting


---

## 🔥 AI Features
- Resume analysis based on job description
- Skill gap detection
- ATS-friendly resume rewriting
- Automatic PDF generation

---

## 📌 Future Improvements
- Resume ranking system
- AI interview questions
- Email notifications
- Job recommendation system
- Admin analytics dashboard

---


## 🔐 Security Features

🔐 Security Features

This Job Portal application follows industry-standard security practices to protect user data, authentication, and system integrity.

🔑 Authentication & Authorization

JWT-based authentication for secure login sessions

Passwords hashed using bcrypt

Role-based access control:

User

Recruiter

Admin

Protected API routes using middleware verification

🛡 Data Protection

Sensitive data (passwords, tokens) never stored in plain text

Environment variables used for secret keys

MongoDB secured via role permissions

Resume files securely stored and accessed only by authorized users

🚫 API Security

Rate limiting applied to AI endpoints to prevent abuse

Input validation to prevent invalid data submission

Protected routes using authentication middleware

Error messages do not expose internal system details

🔒 Frontend Security

Secure API communication via Axios

JWT stored securely in cookies

Protected routes prevent unauthorized access

Role-based UI rendering

🤖 AI Feature Security

Resume scoring & rewriting limited via rate limiter

AI endpoints protected by authentication

Prevents excessive API usage and misuse

⚙ Best Practices Followed

MVC architecture for clean separation

Middleware-based security enforcement

Token expiration handling

Secure PDF generation without exposing user data


## 🧪 How to Run the Project

### Backend
```bash
cd server
npm install
npm run dev

#
cd client
npm install
npm run dev



🤝 Contribution
Pull requests are welcome. Feel free to improve the project.


📬 Contact
Mohamed Salih VA
MCA Student | Full Stack Developer