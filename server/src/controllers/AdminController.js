import User from "../models/User.js";
import {
    getAllUsersService,
    deleteUserService,
    updateUserService,
    getSingleUserService
} from "../services/AdminService.js";



export const getAllUsersController = async (req, res) => {

    const users = await getAllUsersService();
    res.status(200).json({
        success: true,
        data: users,
        message: "Users fetched successfully"
    });
};

export const deleteUsersController = async (req, res) => {
    await deleteUserService(req.params.id);
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    });
};

export const updateUsersController = async (req, res) => {
  const user = await updateUserService(req.params.id, req.body);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
    message: "User updated successfully",
  });
};

export const getSingleUserController = async (req, res) => {
try {
    const user = await getSingleUserService(req.params.id);
    res.status(200).json({
        success: true,
        data: user,
        message: "User fetched successfully"
    });


} catch (error) {
    res.status(500).json({
        success: false,
        message: "Server Error"
    });
}
}
    
export const getAllRecruitersController = async(req,res) =>{
    try {
        const recruiters=await User.find({ role:"recruiter"}).select(
             "name email jobPostedLimit jobPostedCount premium createdAt"
        );
       res.status(200).json({
        success:true,
        data: recruiters,
        message:"Recruiters  fetched Successfully"
       });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"failed to fetch recruiters"
        })
    }
}

