import fastify from 'fastify';

import joi from 'joi';

const app = fastify({

    logger: true
});


// export const authorizationValidation

//     authorization:joi.string().
//         pattern(/^Bearer [A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/,'JWT Token').required(),


const authorizationValidation = joi.object({
    authorization: joi.string()
        .pattern(/^Bearer [A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/, 'JWT Token')
        .required()

})

const userNoOfSeatsEditValidation = joi.object({

    NoOfSeatsBooking: joi.number().min(1).required().strict(),

})

const usergivenparams = joi.object({



    id: joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/, 'MongoDB ObjectId')  // Regex for 24-character hex string
        .required()

})

export const UeventbookEditValidation = {

    authorizationValidation,
    userNoOfSeatsEditValidation,
    usergivenparams

};