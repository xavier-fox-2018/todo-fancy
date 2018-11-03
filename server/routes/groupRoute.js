const router = require('express').Router()

router.get('/',(req,res)=>{
    res.status(200).json({
        message : 'halo dari group route'
    })
})

module.exports = router