import {body, validationResult } from 'express-validator';

export const registerValidation =[
    body("email").isEmail(),
    body("password").isLength({min:6}),

    (req, res, next) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                message:errors.array(),
            })
        }
        next();
    }
]