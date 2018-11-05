const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  let token;
  console.log(req.body)
  let code; 
  req.headers.authorization ? token = req.headers.authorization : code = req.body.code
  if(code) {
    res.locals.gAuthCode = code;
    next();
  }
    if (!token)
    return res.status(401).send({ auth: false, message: 'NO TOKEN PROVIDED' });        

    jwt.verify(token, process.env.SECRET, function(err, decoded) {

      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
      console.log("Token is valid");
      res.locals.authorization = decoded;
      next();
  })
  ;
}

module.exports = verifyToken;