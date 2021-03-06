import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const appointmentSchema = mongoose.Schema(
  {
   nurse:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nurses'
   },
   nurseName:{
     type:String
   },
   doctor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctors'
   },
   doctorName:{
    type:String
  },
   scheduledAt:{
       type: Date,
       required:true,
   },
  },
);

const assessmentSchema = mongoose.Schema(
  {
    name:{
      type:String,
    },
    difficultyBreathing: {
      type: String,
    },
    age: {
      type: String,
    },
    symptomsSet1: {
      type: String,
    },
    symptomsSet2: {
      type: String,
    },
    isReviewed:{
      type: Boolean,
      required: true,
      default: false
    },
    isForwarded:{
      type: Boolean,
    },
    isRejected:{
      type: Boolean
    },
    appointment: [appointmentSchema],
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
