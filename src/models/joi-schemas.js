import Joi from "joi";

export const PoiSpec = {
  name: Joi.string().required(),
  category: Joi.string().optional(),
  description: Joi.string().optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),

};

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    scope: Joi.array().items(Joi.string()).optional(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};


