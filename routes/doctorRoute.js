import express from 'express';
import { addDoctorController, deleteDoctorController, getAllDoctors, getSingalDoctor, updateDoctorController } from '../controllers/doctorController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();


router.post('/add-doctor',  protect,
  authorizeRoles("admin"), addDoctorController);

router.get('/get-all-doctors', getAllDoctors);
router.get('/get-singal-doctor/:id', getSingalDoctor);
router.put('/update-doctor/:id', 
     protect,
  authorizeRoles("admin"), updateDoctorController);


router.delete('/delete-doctor/:id', protect,
  authorizeRoles("admin"), deleteDoctorController);


export default router