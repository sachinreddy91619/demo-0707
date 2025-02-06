import fastify from  'fastify';

import joi from 'joi';

const app=fastify({
    logger:true
})

const EMcreateEventValidation=joi.object({
    
    eventname:joi.string().required(),
    eventdate:joi.date().required(),
    eventlocation:joi.string().required(),
    amountrange:joi.number().min(1).required(),
    eventtime:joi.string().required(),
    totalseats:joi.number().min(10).required(),
    availableseats:joi.number().required(),
    bookedseats:joi.number().required(),


})

export default EMcreateEventValidation