var seneca = require('seneca')();
const cl = require('khal').cl;
const ce = require('khal').ce;

var usersOptions = {type: 'http', port: 11110, host: 'localhost'};
seneca.listen(usersOptions);
seneca.ready(()=> {
    cl('Started');
    seneca.add({role: 'users', cmd: 'getUsersList'}, getUsersList);
});

function getUsersList(args, done) {
    const database = require('seneca')();
    const databaseOptions = {type:'http',port:11100, host:'localhost', pin:{role: 'database', model: 'users', method:'*'}};
    database.client(databaseOptions);
    database.ready(function(){
       cl('connected to database'); 
    });
    database.act({
        role:'database',
        model:'users',
        method:'getUsers'
    },function(err,result){
        if(err) return ce(err);
        done(null, result);
    });
};

// Temporary, see: https://github.com/senecajs/seneca/issues/566
process.removeAllListeners('warning');