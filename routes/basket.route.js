const {Router} = require('express');
const router = Router();
// import module
const Basket = require('../models/Basket')

router.post('/add', async (req, res) => {
  try {
    const {text, userId} = req.body

    const basket = await new Basket({
      text,
      owner: userId,
      completed: false,
      important: false,
    })

    // save basket
    await basket.save()
    res.json(basket)
    
  } catch (error) {
    console.log(error)
  }
})

module.exports = router