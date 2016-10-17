const Hapi = require('hapi');
const seneca = require('seneca');
const Routes = require('./routes.js');
const cl = require('khal').cl;

const hapiSenecaPlugin=require('./hapi-seneca-plugin');
const hapiSenecaPluginOptions = {
    client: 
        {
            type: 'http', 
            port: 11110, 
            host:'localhost', 
            pin:{role:'users',cmd:'*'}
        }
    
};

const server = new Hapi.Server();
server.connection({
    port: 80
});
server.register({
    register: hapiSenecaPlugin,
    options: hapiSenecaPluginOptions
}, (err)=> {
    if (err) throw cl(err);
    server.route(Routes.endpoints);
    server.start((err)=> {
        if (err) throw cl(err);
        cl('Started', server.info.id, 'on', server.info.protocol + '://' + server.info.host + ':' + server.info.port, 'Environment:' + process.env.NODE_ENV);
        
    });
});

process.on('SIGINT', ()=> {
    cl('Good bye');
    process.exit(0);
});

// Temporary, see: https://github.com/senecajs/seneca/issues/566
process.removeAllListeners('warning');