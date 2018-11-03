const router = require('express').Router()

router.get('/',(req,res)=>{
    res.status(200).json({
        message : 'halo dari user route'
    })
})

module.exports = router