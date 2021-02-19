import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Nurse from "../Models/nurseModel.js";

//@desc Auth Nurse and get Token
//@route POST /api/nurses/login
//@access Public
const authNurse = asyncHandler(async (req, res) => {
  const { email, password, phone } = req.body;
  const nurse = email
    ? await Nurse.findOne({ email })
    : await Nurse.findOne({ phone });
  if (nurse && (await nurse.matchPassword(password))) {
    res.json({
      _id: nurse._id,
      firstName: nurse.firstName,
      lastName: nurse.lastName,
      dateOfBirth: nurse.dateOfBirth,
      registrationNum: nurse.registrationNum,
      token: generateToken(nurse._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//@desc get nurse profile
//@route GET /api/nurses/profile
//@access Protected
const getNurseProfile = asyncHandler(async (req, res) => {
  const nurse = await Nurse.findById(req.user._id);
  if (nurse) {
    res.json({
      _id: nurse._id,
      firstName: nurse.firstName,
      lastName: nurse.lastName,
      dateOfBirth: nurse.dateOfBirth,
      address: nurse.address,
      registrationNum: nurse.registrationNum,
      appointments: nurse.appointments,
    });
  } else {
    res.status(401);
    throw new Error("Nurse not Found");
  }
});

//@desc register new Nurse
//@route POST /api/nurses
//@access Public
const registerNurse = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    dateOfBirth,
    address,
    registrationNum,
  } = req.body;

  const nurseExists = email
    ? await Nurse.findOne({ email })
    : await Nurse.findOne({ phone });

  if (nurseExists) {
    res.status(401);
    throw new Error("Nurse already exists");
  }

  if (
    email === "" ||
    password === "" ||
    firstName === "" ||
    dateOfBirth === "" ||
    phone === "" ||
    registrationNum === ""
  ) {
    res.status(401);
    throw new Error("Field required");
  }

  const nurse = await Nurse.create({
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    dateOfBirth,
    registrationNum
  });

  if (nurse) {
    res.status(201).json({
      _id: nurse._id,
      firstName: nurse.firstName,
      lastName: nurse.lastName,
      email: nurse.email,
      phone: nurse.phone,
      address: nurse.address,
      dateOfBirth: nurse.dateOfBirth,
      registrationNum:nurse.registrationNum,
      token: generateToken(nurse._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid nurse data");
  }
});

export { authNurse, getNurseProfile, registerNurse };
