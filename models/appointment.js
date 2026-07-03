import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    appointmentDate:{
        type:String,
        required:true
    },
    appointmentTime:{
        type:String,
        required:true
    },
    status:{
        type:String,
         enum: ["pending", "approved", "completed", "cancelled"],
         default: "pending",
    }
}, {
    timestamps: true,
  })

  const Appointment = mongoose.model("Appointment",  appointmentSchema)

  export default Appointment;