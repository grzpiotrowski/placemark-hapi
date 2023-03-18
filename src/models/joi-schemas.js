import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const PoiSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Lugnaquilla"),
    category: IdSpec,
    description: Joi.string().optional().example("Pretty high mountain."),
    latitude: Joi.number().allow("").required().example(53.123),
    longitude: Joi.number().allow("").required().example(-6.321),
  })
  .label("Poi");

export const PoiSpecPlus = PoiSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PoiPlus");

export const PoiArraySpec = Joi.array().items(PoiSpecPlus).label("PoiArray");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    scope: Joi.array().items(Joi.string()).optional(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");
