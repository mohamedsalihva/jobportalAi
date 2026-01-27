import jwt from "jsonwebtoken";
import User from "../models/User.js";

import {
  createRecruiterService,
  getRecruiterByUserService,
  updateRecruiterService
} from "../services/RecruiterService.js";




export const createRecruiterController = async (req, res) => {
  try {

    const existingRecruiter = await getRecruiterByUserService(req.user._id);

    if (existingRecruiter) {
      return res.status(400).json({
        success: false,
        message: "Recruiter profile already exists"
      });
    }

    const recruiter = await createRecruiterService({
      user: req.user._id,
      companyName: req.body.companyName,
      companyLocation: req.body.companyLocation,
      companyWebsite: req.body.companyWebsite,
      industry: req.body.industry
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, {
        role: "recruiter",
        jobPostLimit: 3,
        jobPostedCount: 0,
        premium: {
          isPremium: false,
          plan: "free",
          expireAt: null,
        },
      }, {
        new: true
      }
    );

    const token = jwt.sign({
        userId: updatedUser._id,
        role: updatedUser.role
      },
      process.env.JWT_SECRET, {
        expiresIn: "5d"
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    return res.status(201).json({
      success: true,
      message: "Recruiter profile created and role updated",
      data: recruiter
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};




export const getMyRecruiterController = async (req, res) => {
  try {
    const recruiter = await getRecruiterByUserService(req.user._id);

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found"
      });
    }

    res.status(200).json({
      success: true,
      data: recruiter
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



export const updateRecruiterController = async (req, res) => {
  try {
    const recruiter = await getRecruiterByUserService(req.user._id);

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found"
      });
    }

    const updatedRecruiter = await updateRecruiterService(
      recruiter._id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updatedRecruiter,
      message: "Recruiter profile updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};