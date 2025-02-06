import fastify from 'fastify';

import joi from 'joi';

const app=fastify({

    logger:true
});


// export const authorizationValidation

//     authorization:joi.string().
//         pattern(/^Bearer [A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/,'JWT Token').required(),


const authorizationValidation = joi.object({
    authorization: joi.string()
    .pattern(/^Bearer [A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/, 'JWT Token')
    .required()

})

    const userLocationValidation=joi.object({

        eventneedlocation:joi.string().min(3).max(30).required(),

    })


    export const UlocValidation = {

        authorizationValidation,
        userLocationValidation
      
    };