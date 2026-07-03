import mongoose, { mongo } from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    specialization:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    feesPerConsultation:{
        type:Number,
        required:true
    },
    availableDays:[String],
    availableTime:{
        start:String,
        end:String
    },
    about:String,

},{timestamps:true})

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;