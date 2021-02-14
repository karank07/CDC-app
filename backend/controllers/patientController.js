import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Patient from "../Models/patientModel.js";

//@desc Auth Patient and get Token
//@route POST /api/patients/login
//@access Public
const authPatient = asyncHandler(async (req, res) => {
  const { email, password, phone } = req.body;
  const patient = email
    ? await Patient.findOne({ email })
    : await Patient.findOne({ phone });
  if (patient && (await patient.matchPassword(password))) {
    res.json({
      _id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      token: generateToken(patient._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//@desc get patient profile
//@route GET /api/patients/profile
//@access Protected
const getPatientProfile = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.patient._id);
  if (patient) {
    res.json({
      _id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      address: patient.address,
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
  const { firstName,lastName, email, password, phone, dateOfBirth, address } = req.body;

  const patientExists = email
  ? await Patient.findOne({ email })
  : await Patient.findOne({ phone });

  if (patientExists) {
    res.status(401);
    throw new Error("Patient already exists");
  }

  if (email === "" || password === "" || firstName === "" || dateOfBirth === "" || phone === "") {
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
    dateOfBirth
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

export { authPatient, getPatientProfile, registerPatient };
