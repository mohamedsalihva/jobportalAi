import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import user from '../models/User.js';


export const signup = async ({
    name,
    email,
    password
}) => {
    const existingUser = await user.findOne({
        email
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
        name,
        email,
        password: hashedPassword,
        provider: "local",
        role: "jobseeker"
    });

    const savedUser = await newUser.save();


    const userObj = savedUser.toObject();
    delete userObj.password;

    return userObj;
}


export const login = async ({
    email,
    password
}) => {
    const existingUser = await user.findOne({
        email
    }).select("+password");

    if (!existingUser) {
        throw new Error("User does not exist");
    }

    if(existingUser.provider === "google"){
        throw new Error("This account registered with google. please login with google accoun   t")
    }
    
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign({
            userId: existingUser._id,
            role: existingUser.role
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    console.log("JWT_SECRET USED:", process.env.JWT_SECRET);

    console.log(token);
    const userObj = existingUser.toObject();
    delete userObj.password;

    return ({
        user: userObj,
        token
    })
}