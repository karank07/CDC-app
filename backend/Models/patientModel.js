import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const assessmentSchema = mongoose.Schema(
  {
    difficultyBreathing: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
    },
    symptomsSet1: {
      type: Boolean,
      default: false,
    },
    symptomsSet2: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const patientSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    assessments: [assessmentSchema],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointments",
      },
    ],
  },
  {
    timestamps: true,
  }
);

patientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

patientSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

const Patient = mongoose.model("Patients", patientSchema);

export default Patient;
