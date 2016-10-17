var seneca = require('seneca')();
const cl = require('khal').cl;

var usersOptions = {type: 'http', port: 11110, host: 'localhost'};
seneca.listen(usersOptions);
seneca.ready(()=> {
    cl('Started');
    seneca.add({role: 'users', cmd: 'getUsersList'}, getUsersList);
});

function getUsersList(args, done) {
    var users = {users: [{username: "AWerner", firstname: "Alex", lastname: "Werner", age: 24}]};
    done(null,users);
};

// Temporary, see: https://github.com/senecajs/seneca/issues/566
process.removeAllListeners('warning');