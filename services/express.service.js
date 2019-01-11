#!/usr/bin/env node
const express = require('express'),
Promise = require('bluebird'),
glob = require('glob'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
path = require('path');

/*var __setupLogs = (app) => {

}*/

var _setupHeaders = (app) => {
  app.route('*').all((req,res,next) => {
    res.set({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Methods' : 'POST, GET'//, PUT, DELETE, OPTIONS'
    });
    next();
  });  
}

var _setupRoutes = (app) => {    
  var routes = glob.sync('**/modules/**/routes/**.routes.js', {ignore: '**/modules/main/**'})    
  routes.forEach(file => {    
    var router = express.Router();       
    var rootPath = file.match(/\w+(?=\.(routes\.js))/g)         
    app.use(`/${rootPath}`, require(path.resolve(file))(router))    
  }) 
}

var _setupHomeRoute = (app) => {
  var route = glob.sync('**/modules/main/routes/**.routes.js')
  var router = express.Router();
  app.use(require(path.resolve(route[0]))(router))
}

var _setupMiddlewares = (app) => {  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/public', express.static(path.join(__dirname, '../public')));
}

var _setupViewEngine = (app) => {
  var views = []
    .concat(glob.sync('**/**/**/**.page.ejs', {ignore: '**/node_modules/**'}),
            glob.sync('**/**/**/**.partial.ejs', {ignore: '**/node_modules/**'}))
    .map(file => path.join(__dirname,path.dirname(file)))

  console.log(views)

  app.set('views', views);
  app.set('view engine', 'ejs');
}
 
class ExpressSetup { 
  static start(){
    return new Promise((resolve,reject) => {
      const app = express()
      console.log(`INFO - Setup Express initialized`)
      _setupHeaders(app)
      _setupMiddlewares(app)
      _setupViewEngine(app)
      _setupHomeRoute(app)
      _setupRoutes(app)      
      console.log(`INFO - Setup Express successful`)
      resolve(app)
    })
  }
}

module.exports = ExpressSetup;