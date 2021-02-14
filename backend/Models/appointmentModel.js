import mongoose from "mongoose";


const appointmentSchema = mongoose.Schema(
  {
   patient:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patients',
    required: true,
   },
   nurse:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nurses'
   },
   doctor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctors'
   },
   scheduledAt:{
       type: Date,
       required:true,
   }
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointments", appointmentSchema)

export default Appointment;