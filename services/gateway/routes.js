var PageHandler = require('./handlers/pageHandler.js');
var UserHandler = require('./handlers/userHandler.js');
exports.endpoints = [
    {method:'GET', path:'/', config:PageHandler.helloWorld},
    {method:'GET', path:'/users', config:UserHandler.getUsersList}
];