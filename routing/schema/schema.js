
const Joi = require('@hapi/joi');


const registervalidate = data=>{
    const schema = Joi.object({
        username:Joi.string()
        
        .min(3)
        .max(30)
        .required(),
    
        password: Joi.string()
            .min(6).required(),
        email: Joi.string().email()
    });
    return schema.validate(data);
}
module.exports.registervalidate = registervalidate;