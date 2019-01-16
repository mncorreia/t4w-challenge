
module.exports = router => {
    router.get('/', ({ res }) => res.status(200).send('Testing route as test, omg'))    
  
    return router
};
  