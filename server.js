import express from 'express'
import dotenv from 'dotenv'
import conecctDB from './cofig/db.js';
import userRoute from './routes/authRoute.js'
import doctorRoute from './routes/doctorRoute.js'
import appointmentRoute from './routes/appointmentRoute.js'
import { errorMiddleware }
  from "./middleware/errorMiddleware.js";

import { notFound }
  from "./middleware/notFoundMiddleware.js";

dotenv.config();

const PORT = process.env.PORT ;

const app = express();
app.use(express.json());
conecctDB();


app.use('/api/v1', userRoute)
app.use('/api/v1', doctorRoute)
app.use('/api/v1', appointmentRoute)


app.use(notFound);
app.use(errorMiddleware);


app.listen(PORT, ()=>{
    console.log(`Server is listen on port ${PORT}`);
    
})

