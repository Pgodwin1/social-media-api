import Joi from 'joi';

export const RegisterUserSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().trim().required(),
    password: Joi.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    profilePicture:  Joi.string(),
    coverPicture:  Joi.string(),
    followers:  Joi.array().items(Joi.string().trim()),
    followings:  Joi.array().items(Joi.string().trim()),
    isAdmin:  Joi.string(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{#label} does not match' })
}); 

export const option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
}

export const loginUserSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30),
    email: Joi.string().trim().required(),
    password: Joi.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/).required(), 
}); 

export const updateInfoSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30),
    email: Joi.string().trim(),
    password: Joi.string().min(3).regex(/^[a-zA-Z0-9]{3,30}$/),
    profilePicture:  Joi.string(),
    coverPicture:  Joi.string(),
    followers:  Joi.array().items(Joi.string().trim()),
    followings:  Joi.array().items(Joi.string().trim()),
    isAdmin:  Joi.string(),
    desc: Joi.string(),
    city: Joi.string(),
    from: Joi.string(),
    relationship: Joi.number(),
});

export const createPostSchema = Joi.object().keys({
    desc: Joi.string().max(500),
    img: Joi.string().trim(),
    likes: Joi.array().items(Joi.string().trim()),
});