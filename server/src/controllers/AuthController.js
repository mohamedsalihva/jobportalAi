import {
    signup,
    login
} from '../services/Authservice.js';

export const signupController = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            })
        }
        const newUser = await signup({
            name,
            email,
            password
        });
        res.status(201).json({
            success: true,
            data: newUser,
            message: "User signed up successfully"
        });

    } catch (error) {
        console.log("Signup error:", error.message);
        res.status(500).json({
            success: false,
            message: "error.message"
        });
    }
}

export const loginController = async (req, res) => {
    try {
        const {
            user,
            token
        } = await login(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};