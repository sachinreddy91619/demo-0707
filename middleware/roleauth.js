

import fastify from 'fastify';
import jwt from 'jsonwebtoken';

const app=fastify({
    logger:true
})



export default (requiredRoles)=>{
    return (request,reply)=>{

        if(!requiredRoles.includes(request.user.role)){
            return reply.status(401).send({error:'User role not having the permissions to do'});
    }


}
}

//================================================


// export default (requiredRoles)=>{
//     return (request,reply,done)=>{

//         if(!requiredRoles.includes(request.user.role)){
//             return reply.status(401).send({error:'User role not having the permissions to do'});
//     }

//     done();
// }
// }