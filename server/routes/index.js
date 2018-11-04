var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('Todo Funcy Dwi Wicaksono')
})

module.exports = router;
