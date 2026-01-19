import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import  Passport  from 'passport';
import "./config/passport.js"


import userRoutes from './routes/UserRoutes.js';
import authRoutes  from './routes/AuthRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';

import JobRoutes from './routes/JobRoutes.js'
import RecruiterRoutes from './routes/RecruiterRoutes.js';

import applicationRoutes from './routes/applicationRoutes.js';
import savedJobRoutes from './routes/savedJobRoutes.js';

import profileRoutes from './routes/ProfileRoutes.js';

const app = express();

app.use(Passport.initialize());

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin:" http://localhost:5173",
    credentials :true
}));


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/jobs', JobRoutes);
app.use('/api/recruiter', RecruiterRoutes);

app.use('/api/applications',applicationRoutes);
app.use('/api/saved',savedJobRoutes);

app.use('/api/profile',profileRoutes);

export default app;
