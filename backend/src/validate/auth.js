import Joi, { required } from "joi"

export const signUpValid = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required().max(30),
    lastName: Joi.string().required().max(30),
    phone: Joi.string().pattern(/^(0\d{9})$/).required(),
    password: Joi.string().min(6).max(50).required(),
    confirmPassword: Joi.string().min(6).max(50).required().valid(Joi.ref("password")),
})

export const signInValid = Joi.object({
    email: Joi.string().email().required(),
    hashedPassword: Joi.string().min(6).max(50).required(),
})