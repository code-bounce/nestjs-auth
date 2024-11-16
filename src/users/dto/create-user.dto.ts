import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  //   username: Joi.string().alphanum().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(8)
    .max(100)
    .required(),
  confirmPassword: Joi.ref('password'),
}).with('password', 'confirmPassword');

export type CreateUserDto = {
  //   username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
