const ExpressService = require('./services/express.service'),
LoggerService = require('./services/logger.service'),
Promise = require('bluebird'),
util = require('util');

Promise.resolve()
.then(LoggerService.setupLoggerService)
.then(ExpressService.start)
.then(app => {
  //console.log("APP " + app)

  var server = app.listen(8887, () =>{
    console.info(util.inspect(server.address()))
  }).on('listening', () => {
    console.info('Server listening...')
  }).on('connection', () => {
    console.warn('An connection incoming...')
  }).on('error', (e) => {
    if (e.code === 'EADDRINUSE') 
      console.error(`${e.code} - Address already in use`);

    if (e.code === 'ECONNRESET') 
      console.error(`${e.code} - Connection reset by peer`);

    else 
      console.error(`${e.code} - ${e.message}`);    
      
  })
  
})

