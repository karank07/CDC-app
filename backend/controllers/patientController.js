import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Patient from "../Models/patientModel.js";

//@desc get patient profile
//@route GET /api/patients/profile
//@access Protected
const getPatientProfile = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.user._id);
  if (patient) {
    res.json({
      _id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      address: patient.address,
      assessments: patient.assessments,
      appointments: patient.appointments,
    });
  } else {
    res.status(401);
    throw new Error("Patient not Found");
  }
});

//@desc register new patient
//@route POST /api/patients
//@access Public
const registerPatient = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth,
    address,
  } = req.body;

  const patientExists = email
    ? await Patient.findOne({ email })
    : await Patient.findOne({ phone });

  if (patientExists) {
    res.status(401);
    throw new Error("Patient already exists");
  }

  if (
    email === "" ||
    password === "" ||
    firstName === "" ||
    dateOfBirth === "" ||
    phone === ""
  ) {
    res.status(401);
    throw new Error("Field required");
  }

  const patient = await Patient.create({
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    dateOfBirth,
  });

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      dateOfBirth: patient.dateOfBirth,
      token: generateToken(patient._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid patient data");
  }
});

//@desc get list of patients to review assessments
//@route GET /api/patients/listForReview
//@access Protected (Nurse or Doctor)
const getListOfPatients = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const allPatients = await Patient.find({ ...keyword });
  const patients = allPatients.filter(
    (patient, i) => patient.assessments.length !== 0 && patient.assessments[0].isReviewed===false
  );
  res.json(patients)
});

//@desc post assessment for the logged in patient
//@route POST /api/patients/:id/assessment
//@access Protected
const postPatientAssessment = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  const newAssessmentData = {
    difficultyBreathing: req.body.difficultyBreathing,
    age: req.body.age,
    symptomsSet1: req.body.symptomsSet1,
    symptomsSet2: req.body.symptomsSet2,
    isReviewed:false
  };
  if (patient) {
    patient.assessments.unshift(newAssessmentData);
    await patient.save();
    res.json({ message: "Assessment Added" });
  }
  else{
    res.status(404)
    throw new Error('Patient not found')
  }
});

//@desc get list of previous assessments of patient
//@route GET /api/patients/:id/assessment
//@access Protected 
const getPatientPreviousAssessments = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)
  if(patient){
    if(patient.assessments.length!==0){
      res.json(patient.assessments)
    }else{
      res.json({message:'No previous assessments to show'})
    }
  }
  else{
    res.status(404)
    throw new Error('Patient not found')
  }
});

export {
  getPatientProfile,
  registerPatient,
  getListOfPatients,
  postPatientAssessment,
  getPatientPreviousAssessments
};
