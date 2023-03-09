import Joi from "joi";

export const PoiSpec = {
  name: Joi.string().required(),
  description: Joi.string().optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  
};