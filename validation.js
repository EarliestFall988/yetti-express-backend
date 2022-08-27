const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const newUserSchema = Joi.object({
    name: {
      first: Joi.string().min(4).required(),
      last: Joi.string().min(4).required(),
      nick: Joi.string().min(4).required(),
    },

    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const validation = newUserSchema.validate(data);
  return validation;
};

const userLoginValidation = (data) => {
  const newUserLogin = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const validation = newUserLogin.validate(data);

  return validation;
};

const entityValidation = (data) => {
  const newEntity = Joi.object({
    location: Joi.array.length(3),
    rotation: Joi.array.length(3),
    scale: Joi.array.length(3),
  });
};

module.exports.registerValidation = registerValidation;
module.exports.userLoginValidation = userLoginValidation;
module.exports.entityValidation = entityValidation;
