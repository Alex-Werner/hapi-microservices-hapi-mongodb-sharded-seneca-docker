var cl = require('khal').cl;
var UserHandler = {
    getUsersList:{
        handler:function (request, reply) {
                return reply.act({role:'users', cmd:'getUsersList'});
        }
    }
};
module.exports= UserHandler;