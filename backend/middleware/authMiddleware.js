import jwt from "jsonwebtoken";
import Patient from "../Models/patientModel.js";
import Nurse from "../Models/nurseModel.js";
import Doctor from "../Models/doctorModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user =
        (await Patient.findById(decoded.id).select("-password")) ||
        (await Nurse.findById(decoded.id).select("-password")) ||
        (await Doctor.findById(decoded.id).select("-password"));

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req,res,next) =>{
  if(req.user && req.user.registrationNum){
    next()
  }else{
    res.status(400)
    throw new Error('Not authorized as an Admin')
  }
}

export { protect, admin };
