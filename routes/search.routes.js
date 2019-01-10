
module.exports = router => {
  router.get('/', ({req,res,next})=>{
    res.status(200).send('Message receive in search')
  })

  return router
};
