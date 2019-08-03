import Joi from 'joi';

const Validator = {};

Validator.signin = (email, password) => {
    const schema = Joi.object().keys({
        email: Joi.string().regex(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      });
      // joi schema
    return Joi.validate(
          { email, password }, schema, {abortEarly: false}
        );
}

Validator.createEntry = (pH, waterLevel) => {
    const schema = Joi.object().keys({
        pH: Joi.number(),
        waterLevel: Joi.string(),
    })
    
    return Joi.validate({ pH, waterLevel }, schema, { abortEarly: false });  
}

Validator.validatePH = (pH) => {
    const schema = Joi.object().keys({
        pH: Joi.number(),
    })
    
    return Joi.validate({ pH }, schema, { abortEarly: false });  
}

export default Validator;