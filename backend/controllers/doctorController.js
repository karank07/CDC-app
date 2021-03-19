import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Doctor from "../Models/doctorModel.js";
import Patient from "../Models/patientModel.js";


//@desc register new Doctor
//@route POST /api/doctors/register
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
    registrationNum,
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
      registrationNum: doctor.registrationNum,
      token: generateToken(doctor._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid doctor data");
  }
});

//@desc get list of patients to review forwarded assessments
//@route GET /api/doctors/forwarded-assessments
//@access Protected (Doctor)
const getForwardedAssessments = asyncHandler(async (req, res) => {
  const allPatients = await Patient.find().select("-password");
  const patients = allPatients.filter(
    (patient, i) =>
      patient.assessments.length !== 0 &&
      patient.assessments[0].isReviewed === false &&
      patient.assessments[0].isForwarded === true
  );
  if (patients.length !== 0) {
    res.json(
      patients.map((p) => {
        return {
          "._id": p._id,
          name: "" + p.firstName + " " + p.lastName,
          assessment: p.assessments[0],
        };
      })
    );
  } else {
    res.json({ message: "No patients to review" });
  }
});

//@desc review the selected assessment
//@route POST /api/doctors/review-assessments/:id
//@access Protected
const reviewForwardedAssessment = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ "assessments._id": req.params.id });
  const { isRejected, isForwarded, isReviewed } = req.body;
  if (patient) {
    const i = patient.assessments.findIndex((x) => x._id == req.params.id);
    patient.assessments[i].isReviewed = isReviewed;
    patient.assessments[i].isRejected = isRejected || false;
    patient.assessments[i].isForwarded = isForwarded || false;
    const reviewedPatient = await patient.save();
    if (reviewedPatient) {
      res.json({
        "patient._id": patient._id,
        patient_name: "" + patient.firstName + " " + patient.lastName,
        assessment: reviewedPatient.assessments[0],
      });
    } else {
      res.status(400);
      throw new Error("Assessment review not updated");
    }
  }
});

//@desc schedule an appointment
//@route POST /api/doctors/schedule-appointment/:id
//@access Protected
const scheduleAppointment = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ "assessments._id": req.params.id });
  const newAppointment = {
    doctor: "" + req.user._id,
    doctorName: "Dr. " + req.user.firstName + " " + req.user.lastName,
    scheduledAt: req.body.date,
  };
  if (patient) {
    const i = patient.assessments.findIndex((x) => x._id == req.params.id);
    patient.assessments[i].appointment.unshift(newAppointment);
    const updatedPatient = await patient.save();
    if (updatedPatient) {
      res.json({
        "patient._id": patient._id,
        appointment: updatedPatient.assessments[i].appointment[0],
      });
    } else {
      res.status(400);
      throw new Error("not scheduled");
    }
  }
});

export { registerDoctor, getForwardedAssessments, reviewForwardedAssessment , scheduleAppointment };
