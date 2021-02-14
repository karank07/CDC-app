import mongoose from "mongoose";


const nurseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    registrationNum:{
        type: String,
        required: true,
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointments'
    }]
  },
  {
    timestamps: true,
  }
);

const Nurse = mongoose.model("Nurses", nurseSchema)

export default Nurse;