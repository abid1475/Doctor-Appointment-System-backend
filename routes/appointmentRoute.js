import express from 'express';
import { bookAppointment, deleteAppointment, getDoctorAppointments, getPatientAppointments, updateAppointmentStatus } from '../controllers/appointmentController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';


const router = express.Router();

router.post('/book-appointment',
    protect,
  authorizeRoles("patient"), bookAppointment);


router.get("/get-patient-appointments/:id",
     protect,
  authorizeRoles("patient"), getPatientAppointments);


router.get("/get-doctor-appointments/:id",
    protect,
  authorizeRoles("doctor"), getDoctorAppointments);


router.put("/updateappointment-status/:id",
      protect,
  authorizeRoles("doctor"), updateAppointmentStatus)


router.delete("/delete-appointment/:id", protect, deleteAppointment)


export default router