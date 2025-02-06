import fastify from 'fastify';

import joi from 'joi';

const app=fastify({
    logger:true
})

const EMupdateValidation=joi.object({

        // authorization:joi.string().
        // pattern(/^Bearer [A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/,'JWT Token').required(),

        authorization: joi.string()
        .pattern(/^Bearer [A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/, 'JWT Token')
        .required(),



        id:joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),

        eventname:joi.string(),
        eventdate:joi.date(),
        eventlocation:joi.string(),
        amountrange:joi.number().min(1),
        eventtime:joi.string(),
        totalseats:joi.number().min(10),
        availableseats:joi.number(),
        bookedseats:joi.number()



})

export default EMupdateValidation