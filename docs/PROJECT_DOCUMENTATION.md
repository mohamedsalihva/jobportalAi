# Job Portal (MERN) — Project Documentation

## 1) Project Overview
**Project Name:** Job Portal  
**Type:** Full‑stack web application  
**Stack:** MERN (MongoDB, Express, React, Node.js)  
**Purpose:** A job marketplace where job seekers can browse and apply to jobs, recruiters can post/manage jobs, and admins can monitor users and analytics. Includes AI‑based resume scoring and recruiter upgrade/payment flows.

---

## 2) Key Features

### 2.1 Job Seeker
- Email/password login and Google OAuth
- Browse all jobs
- View job details
- Save/unsave jobs
- Apply for jobs
- Profile management + resume upload
- AI resume score preview before applying

### 2.2 Recruiter
- Recruiter profile creation & update
- Post, update, delete jobs
- View applicants for each job
- Update applicant status (pending/shortlisted/rejected)
- Job posting limit with upgrade flow

### 2.3 Admin
- View users and recruiters
- Update recruiter job posting limits
- Admin analytics dashboard (users, recruiters, jobs, applications)

### 2.4 AI & Resume Tools
- Resume score preview per job (ATS style)
- Resume rewrite (AI)

### 2.5 Payments
- Razorpay order + verification (upgrade flow)

---

## 3) Tech Stack & Libraries

### Frontend (React + Vite)
- React 19
- React Router
- Axios (API calls)
- Tailwind CSS (UI)
- Lucide Icons
- Recharts (charts for analytics)

### Backend (Node + Express)
- Express 5
- Mongoose (MongoDB)
- JWT (authentication)
- Passport + Google OAuth 2.0
- bcrypt (password hashing)
- Express Validator (validation)
- Helmet (security headers)
- CORS
- Rate limiting
- Multer (file uploads)
- Razorpay SDK
- Stripe SDK (present in dependencies)
- Puppeteer, pdf-parse, mammoth (resume extraction)
- Gemini API (AI)

---

## 4) Architecture & Folder Structure

```
jobportal/
├─ client/                # React frontend
│  ├─ src/
│  │  ├─ pages/            # Pages (jobs, recruiter, profile, admin, auth)
│  │  ├─ components/       # Reusable UI components
│  │  ├─ routes/           # PrivateRoute/PublicRoute
│  │  ├─ api/axios.js      # API client
│  │  └─ constants/        # API endpoints
│  └─ package.json
├─ server/                # Express backend
│  ├─ src/
│  │  ├─ routes/           # API routes
│  │  ├─ controllers/      # Controllers
│  │  ├─ middlewares/      # Auth, validators, rate limiters
│  │  ├─ models/           # Mongoose models
│  │  ├─ services/         # Business logic
│  │  └─ config/           # Passport config
│  └─ package.json
└─ docker-compose.yml
```

---

## 5) Authentication & Security

### 5.1 Auth Flow
- **Login:** `/api/auth/login` → JWT created and stored in HTTP‑only cookie
- **Signup:** `/api/auth/signup`
- **Google OAuth:** `/api/auth/google` → callback creates cookie and redirects
- **Auth check:** `/api/users/profile` uses cookie to validate session

### 5.2 Middleware
- `AuthMiddleware`: validates JWT from cookie
- `isAdmin` / `isRecruiter`: role guards

### 5.3 Security Measures
- Helmet headers
- CORS with allowlist (`CLIENT_URL`)
- Rate limiting (login/signup, AI, payments)
- Password hashing with bcrypt
- HTTP‑only cookies

---

## 6) API Endpoints (Major)

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `GET /api/auth/me` (debug)

### Users & Profile
- `GET /api/users/profile`
- `POST /api/users/logout`
- `GET /api/profile/me`
- `PUT /api/profile/me`
- `POST /api/profile/resume`

### Jobs
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`
- `GET /api/jobs/my-jobs`

### Saved Jobs
- `GET /api/saved/my`
- `POST /api/saved/:jobId/save`
- `DELETE /api/saved/:jobId/save`

### Applications
- `POST /api/applications/:jobId/apply`
- `GET /api/applications/myApplication`
- `GET /api/applications/job/:jobId`
- `PUT /api/applications/:id/status`

### Recruiter
- `POST /api/recruiter/create-profile`
- `GET /api/recruiter/profile`
- `PUT /api/recruiter/profile`

### Admin
- `GET /api/admin/users`
- `GET /api/admin/recruiter`
- `GET /api/admin/analytics`
- `PUT /api/admin/recruiter/:id/limit`

### AI
- `POST /api/ai/resume-score/:jobId`
- `POST /api/ai/resume-rewrite/:jobId`

### Payments
- `POST /api/payments/razorpay/order`
- `POST /api/payments/razorpay/verify`

### Health
- `GET /api/health`

---

## 7) UI & UX (Frontend)

### Pages
- Home
- Login / Signup
- Jobs (list + details)
- Profile + Edit Profile Modal
- Recruiter dashboard
- Recruiter job posting
- Recruiter applicants
- Admin dashboard

### Key UI Components
- Navbar with theme toggle
- Job cards + Job details
- Apply modal (resume score + submission)
- Success modal
- Toast notifications
- Mobile job sheet

### State Management
Uses React state (`useState`, `useEffect`, `useMemo`) at page level:
- Job filtering: saved/applied tabs
- Search + filters in recruiter pages
- Modal state (apply, success, edit profile)
- Optimistic UI for save/apply

---

## 8) Resume & AI Flow
- Resume is uploaded to server (Multer) and stored
- Resume text extracted (pdf-parse / mammoth)
- AI evaluation generates ATS score + feedback
- UI shows score + matched/missing skills

---

## 9) Deployment

### Frontend
- **Vercel** hosting (client)
- Uses `/api` proxy to backend (same‑site auth)

### Backend
- **Render** hosting (server)
- `NODE_ENV=production`
- MongoDB Atlas connection

### Uptime
- `/api/health` endpoint for uptime monitoring
- UptimeRobot can ping every 5 min to avoid cold starts

---

## 10) Environment Variables (Summary)

### Backend
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME`
- `GEMINI_API_KEY`
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`

### Frontend
- `VITE_BACKEND_URL` (local dev)
- `VITE_RAZORPAY_KEY_ID`

---

## 11) Authentication Strategy (Cookie‑based)
- JWT stored in HTTP‑only cookies
- Protected routes via `PrivateRoute`
- Public routes redirect if already logged in

---

## 12) Filters & Search

### Jobs page
- Tabs: Explore, Saved, Applied
- Filters by saved/applied IDs

### Recruiter My Jobs
- Search by title/location/type
- Filter active/inactive

### Recruiter Applicants
- Search by applicant name/email

---

## 13) Professional Summary (for submission)

This project demonstrates a complete MERN stack application with role‑based access (job seekers, recruiters, admins), AI‑powered resume analysis, payment upgrade flow, and a production‑ready deployment setup. The system emphasizes clean UI, secure authentication, and scalable API architecture with proper middleware, validation, and role guards.

---

## 14) Future Improvements
- Add pagination and server‑side filtering
- Email notifications
- Improve analytics dashboard
- Add tests (unit + integration)

