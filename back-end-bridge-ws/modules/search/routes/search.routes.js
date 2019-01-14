const controller = require('../controllers/search.controller');
const { check, validationResult } = require('express-validator/check');


module.exports = router => {
  router.get('/', controller.getChecks, controller.validationCheck, controller.findHotels)
  return router
};
