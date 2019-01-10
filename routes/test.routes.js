
module.exports = router => {
    router.get('/', ({ res }) => res.status(200).send('Message receive in test'))
    
  
    return router
};
  