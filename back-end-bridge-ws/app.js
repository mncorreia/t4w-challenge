const ExpressService = require('./services/express.service'),
Promise = require('bluebird')

Promise.resolve()
.then(ExpressService.start)
.then(app => {
  //console.log("APP " + app)
  if(process.env.DEBUG)
    ExpressService.allowDebug()

  var server = app.listen(8887, () =>{
    console.log(server.address())
  }).on('listening', () => {
    console.log('Info - Server listening...')
  }).on('connection', () => {
    console.log('An connection incoming...')
  }).on('error', (e) => {
    if (e.code === 'EADDRINUSE') 
      console.log(`ERROR ${e.code} - Address already in use`);

    if (e.code === 'ECONNRESET') 
      console.log(`ERROR ${e.code} - Connection reset by peer`);

    else 
      console.log(`ERROR ${e.code} - ${e.message}`);    
      
  })
  
})

