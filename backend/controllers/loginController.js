import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Patient from "../Models/patientModel.js";
import Nurse from "../Models/nurseModel.js";
import Doctor from "../Models/doctorModel.js";

//@desc Auth User and get Token
//@route POST /api/user/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password} = req.body;

  const user =
    (await Patient.findOne({ email }))||
    (await Nurse.findOne({ email })) ||
    (await Doctor.findOne({ email }));

  const passMatch = await user.matchPassword(password);
  if (user && passMatch) {
    const type = user.registrationNum ? user.registrationNum.charAt(0) === 'N' ? "nurse" : "doctor" :"patient"
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      token: generateToken(user._id),
      type: type,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // const patient = email
  //   ? await Patient.findOne({ email })
  //   : await Patient.findOne({ phone });
  // if (patient && (await patient.matchPassword(password))) {
  //   res.json({
  //     _id: patient._id,
  //     firstName: patient.firstName,
  //     lastName: patient.lastName,
  //     dateOfBirth: patient.dateOfBirth,
  //     token: generateToken(patient._id),
  //   });
  // } else {
  //   res.status(401);
  //   throw new Error("Invalid credentials");
  // }
});

export { authUser };
