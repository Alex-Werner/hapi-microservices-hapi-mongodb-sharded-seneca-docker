const seneca = require('seneca')();
const cl = require('khal').cl;
const Users = require('./models/users.js');
const routerOptions = {type: 'http', port: 11100, host: 'localhost'};


seneca.listen(routerOptions);
seneca.ready(()=> {
    cl('Started on', routerOptions.type, routerOptions.host, "port", routerOptions.port);
    seneca.add({role: 'database', model: 'users', method: 'getUsers'}, getUsers);
});

var getUsers = function (args, done) {
    Users
        .search({}, {}, {})
        .then((res)=> {
            var users = {
                users: res
            };
            done(null, users);
        })
        .catch((e)=> {
            cl('Err', e)
            var users = {
                users: []
            };
            done(null, users);
        });
   
};