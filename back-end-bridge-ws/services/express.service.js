#!/usr/bin/env node
const express = require('express'),
Promise = require('bluebird'),
glob = require('glob'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
path = require('path'),
ejs = require('ejs'),
cors = require('cors'),
app = express();

/*var __setupLogs = (app) => {

}*/

var _setupMiddlewares = (app) => {  
  console.info('Setting Middlewares...')
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  //app.use(express.static(__dirname + '/public'));
  return app
}

var _setupViewEngine = (app) => {
  console.info('Setting View Engine...')

  // var views = []
  //   .concat(glob.sync('**/**/**/**.page.ejs', {ignore: '**/node_modules/**'}),
  //           glob.sync('**/**/**/**.partial.ejs', {ignore: '**/node_modules/**'}))    
  //   .map(file => path.join(__dirname, path.dirname(file) + '/'))
  //   .filter((file, index, self) => self.indexOf(file) === index)

  //console.debug(views)

  // app.engine('html', ejs.renderFile);
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'html');
  return app
  
}

var _setupHeaders = (app) => {
  console.info('Setting Headers...')
  app.route('*').all((req,res,next) => {
    res.set({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Methods' : 'POST, GET'//, PUT, DELETE, OPTIONS'
    });
    next();
  });  
  return app
}

var _setupRoutes = (app) => {    
  console.info('Setting Routes...')
  var routes = glob.sync('**/modules/**/routes/**.routes.js', {ignore: '**/modules/main/**'})    
  routes.forEach(file => {    
    var router = express.Router();       
    var rootPath = file.match(/\w+(?=\.(routes\.js))/g)         
    app.use(`/${rootPath}`, require(path.resolve(file))(router))    
  }) 
  return app
}

var _setupHomeRoute = (app) => {
  console.info('Setting Home Route...')
  var route = glob.sync('**/modules/main/routes/**.routes.js')
  var router = express.Router();
  app.use(require(path.resolve(route[0]))(router))
  return app
}

var _handleErrors = (app) => {
  console.info('Setting handle errors of application...')
  
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(`GetPrototypeOf Error : ${Object.getPrototypeOf(err)}`)    
    
    res.status(400).json({error: err.message})
  })

}
 
class ExpressSetup { 
  static start(){
    return new Promise((resolve,reject) => {
      const app = express()
      console.log(`INFO - Setup Express initialized`)      
      _setupMiddlewares(app)
      _setupViewEngine(app)
      _setupHeaders(app)
     // _setupHomeRoute(app)
      _setupRoutes(app)     
      _handleErrors(app) 
      console.log(`INFO - Setup Express successful`)
      resolve(app)
    })
  }
}

module.exports = ExpressSetup;