import Job from "../models/Job.js";
  

export const createJobService = async (productData) => {
        return await Job.create(productData);
};

export const getAllJobService = async ()=>{
        return await Job.find();
};

export const  getSingleJobService = async (id) =>{
    return await Job.findById(id);
};

export const updateJobService = async (id, updateData) =>{
    return await Job.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteJobService = async (id) =>{
    return await Job.findByIdAndDelete(id);
};
