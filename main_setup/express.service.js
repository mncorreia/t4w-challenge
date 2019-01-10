#!/usr/bin/env node
const express = require('express'),
Promise = require('bluebird'),
glob = require('glob'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
path = require('path');

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
  var routes = glob.sync('**/routes/**.routes.js')  
  routes.forEach(file => {    
    var router = express.Router();        
    app.use(`/${file.match(/\w+(?=\.(routes\.js))/g)}`, require(path.resolve(file))(router))
  }) 
}

var _setupMiddlewares = (app) => {  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
}

var _setupViewEngine = (app) => {
  app.set('views', path.join(__dirname, 'views'));
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
      _setupRoutes(app)
      console.log(`INFO - Setup Express successful`)
      resolve(app)
    })
  }
}

module.exports = ExpressSetup;