import Appointment from "../models/appointment.js"


// book a Appointment
export const bookAppointment = async(req, res)=>{
  try {
    const {patientId,
         doctorId,
         appointmentDate,
         appointmentTime} = req.body

         const alreadyBooked = await Appointment.findOne({ doctorId,
         appointmentDate,
         appointmentTime,});

         if(alreadyBooked){
            return res.status(400).json({
                success:false,
                message:"Slot already booked"
            })
         }
         const appointment = await Appointment.create({
          patientId,
          doctorId,
          appointmentDate,
          appointmentTime,
         })
         return res.status(201).json({
          success:true,
          message:"Appointment booked successfully",
          appointment,
         })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}


// Get Patient Appointments  

export const getPatientAppointments =async (req, res)=>{
  try {
    const appointment = await Appointment.find({
      patientId:req.params.id,
    }).populate("patientId", "-password").populate({
      path:"doctorId",
      populate:{
          path:"userId",
            select:"-password"
      }
    })
    return res.status(200).json({
      success:true,
      appointment,
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}




// Get Doctor Appointments
export const getDoctorAppointments = async(req,res)=>{
   try {

      const appointments = await Appointment.find({
         doctorId:req.params.id
      })
      .populate("patientId", "-password");

      return res.status(200).json({
         success:true,
         appointments,
      });

   } catch (error) {
      return res.status(500).json({
         success:false,
         message:error.message,
      })
   }
}


// Update Appointment Status

export const updateAppointmentStatus = async(req, res)=>{
  try {
    const appointment = await Appointment.findById(req.params.id);
    if(!appointment){
      return res.status(404).json({
        success:false,
        messsage:"Appointment not found",
      })
    }
    appointment.status = req.body.status || appointment.status;
    await appointment.save();
    return res.status(200).json({
      success:true,
      message:"Appointment not found",
      appointment,
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


// DELETE APPOINTMENT

export const  deleteAppointment =async(req, res)=>{
  try {
    const appointment = await Appointment.findById(req.params.id);
    if(!appointment){
      return res.status(404).json({
        success:false,
        message:"Appointment not found",
      })
    }
    await appointment.deleteOne();

    return res.status(200).json({
      success:true,
      message:"Appointment deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}