const controller = require('../controllers/search.controller');

module.exports = router => {
  router.get('/', controller.findHotels)
  return router
};
