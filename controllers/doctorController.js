import Doctor from "../models/docotor.js";
   

// Add Doctor
export const addDoctorController =async(req, res)=>{
        try {
       const {   userId,
      specialization,
      experience,
      feesPerConsultation,
      availableDays,
      availableTime,
      about,} = req.body

      const doctor = await Doctor.create({
           userId,
      specialization,
      experience,
      feesPerConsultation,
      availableDays,
      availableTime,
      about,
      })
      return res.status(201).json({
        success:true,
        message:"Doctor added successfully",
        doctor,
      })
        } catch (error) {
           return res.status(500).json({
            success:false,
            message:error.message
           }) 
        }
}



// Get All Doctors
export const getAllDoctors =async(req, res)=>{
    try {
        const doctors = await Doctor.find().populate("userId", "-password");

        return res.status(200).json({
            success:true,
            totalDoctors: doctors.length,
            doctors,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// Get Singal Doctor
export const getSingalDoctor = async (req, res) => {
  try {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      doctor,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// update Doctor Information
export const updateDoctorController = async(req, res)=>{
    try {
        const doctor = await Doctor.findById(req.params.id);

        if(!doctor){
            return res.status(404).json({
                success:false,
                message:"Doctor not found"
            })
        }

    doctor.specialization =
      req.body.specialization || doctor.specialization;

    doctor.experience =
      req.body.experience || doctor.experience;

    doctor.feesPerConsultation =
      req.body.feesPerConsultation ||
      doctor.feesPerConsultation;

    doctor.availableDays =
      req.body.availableDays || doctor.availableDays;

    doctor.availableTime =
      req.body.availableTime || doctor.availableTime;

    doctor.about =
      req.body.about || doctor.about;
      const updateDoctor = doctor.save();

     return res.status(200).json({
       success:true,
       message:"Doctor updated successfully",
       doctor:updateDoctor, 
      })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}




// Delete Doctor

export const deleteDoctorController =async(req, res)=>{
    try {
        const doctor = await Doctor.findById(req.params.id)

        if(!doctor){
            return res.status(404).json({
                success:false,
                message:"Doctor not founded"
            })
        };
        await doctor.deleteOne();
        return res.status(200).json({
            success:true,
            message: "Doctor deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:error.message
        })
    }
}