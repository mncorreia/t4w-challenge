  
module.exports = router => {
  router.get('/', (req,res,next) => {
    res.send('Main page')     
  })
  return router
};
