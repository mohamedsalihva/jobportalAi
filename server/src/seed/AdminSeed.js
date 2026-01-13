import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import  'dotenv/config';

import User from '../models/User.js';


const seedAdmin = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding admin user');

        const existingAdmin = await User.findOne({role: 'admin'});
        if (existingAdmin){
            console.log("Admin user already exists. Seeding skipped.");
            process.exit(0)
        }

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        )
        
        await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: 'admin'
        })

        console.log("Admin user seeded successfully");
        process.exit(0)

    } catch (error) {
        console.error("Error seeding admin user:", error);
        process.exit(1);
    }
}
seedAdmin();

