import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Doctor from "../Models/doctorModel.js";

//@desc register new Doctor
//@route POST /api/doctors
//@access Public
const registerDoctor = asyncHandler(async (req, res) => {
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
  
    const doctorExists = email
      ? await Doctor.findOne({ email })
      : await Doctor.findOne({ phone });
  
    if (doctorExists) {
      res.status(401);
      throw new Error("doctor already exists");
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
  
    const doctor = await Doctor.create({
      firstName,
      lastName,
      email,
      password,
      address,
      phone,
      dateOfBirth,
      registrationNum
    });
  
    if (doctor) {
      res.status(201).json({
        _id: doctor._id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        phone: doctor.phone,
        address: doctor.address,
        dateOfBirth: doctor.dateOfBirth,
        registrationNum:doctor.registrationNum,
        token: generateToken(doctor._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid doctor data");
    }
  });

  export { registerDoctor }