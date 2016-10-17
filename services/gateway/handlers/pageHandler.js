var PageHandler = {
  helloWorld:{
      handler:function (request, reply) {
          return reply('<h2>Hello world! Have an hapi day!</h2>');
      }
  }  
};
module.exports= PageHandler;