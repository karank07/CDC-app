import asyncHandler from "express-async-handler";
import Patient from "../Models/patientModel.js";
import Nurse from "../Models/nurseModel.js";
import Doctor from "../Models/doctorModel.js";

//@desc Get list of patients
//@route GET /api/admins/patient-list
//@access Protected admin
const getPatientList = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
    const patientList = await Patient.find({...keyword}).select("-password")
    res.json(patientList)
})

//@desc Get list of nurses
//@route GET /api/admins/nurse-list
//@access Protected admin
const getNurseList = asyncHandler(async (req, res) => {
    const nurseList = await Nurse.find().select("-password")
    res.json(nurseList)
})

//@desc Get list of doctors
//@route GET /api/admins/doctor-list
//@access Protected admin
const getDoctorList = asyncHandler(async (req, res) => {
    const doctorList = await Doctor.find().select("-password")
    res.json(doctorList)
})

export {getPatientList, getNurseList, getDoctorList}
