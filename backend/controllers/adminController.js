import asyncHandler from "express-async-handler";
import Patient from "../Models/patientModel.js";
import Nurse from "../Models/nurseModel.js";
import Doctor from "../Models/doctorModel.js";
import moment from "moment";

//@desc Get list of patients
//@route GET /api/admins/patient-list
//@access Protected admin
const getPatientList = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const patientList = await Patient.find({ ...keyword }).select("-password");
  res.json(patientList);
});

//@desc Get list of nurses
//@route GET /api/admins/nurse-list
//@access Protected admin
const getNurseList = asyncHandler(async (req, res) => {
  const nurseList = await Nurse.find().select("-password");
  res.json(nurseList);
});

//@desc Get list of doctors
//@route GET /api/admins/doctor-list
//@access Protected admin
const getDoctorList = asyncHandler(async (req, res) => {
  const doctorList = await Doctor.find().select("-password");
  res.json(doctorList);
});

//@desc delete a user
//@route DELETE /api/admins/delete-user/:id
//@access Protected admin
const deleteUser = asyncHandler(async (req, res) => {
  const user =
    (await Patient.findById(req.params.id)) ||
    (await Nurse.findById(req.params.id)) ||
    (await Doctor.findById(req.params.id));
  if (user) {
    await user.remove();
    res.json({ success: true });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get daily, weekly, monthly patient report
//@route GET /api/admins/report
//@access Protected admin
const getReport = asyncHandler(async (req, res) => {
  const from = req.query.from
  const to = req.query.to
  const patientList = await Patient.countDocuments({"assessments.createdAt":{$gte: from, $lt: to}});
  res.json(patientList);
});
// moment(Date.now()).format("YYYY-MM-DD")
export { getPatientList, getNurseList, getDoctorList, deleteUser, getReport };
