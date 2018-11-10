const User = require('../models/user')
const hash = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const sgMail = require('@sendgrid/mail')

module.exports = {
    signup: (req, res) => {
        let name = req.body.name
        let email = req.body.email
        let password = hash.encode(req.body.password)
        User.find({email:email})
        .then(user => {
            if(user.length === 0) {
                User.create({name, email, password})
                .then(newUser => {
                    sgMail.setApiKey(process.env.SENDGRID)
                    const msg = {
                    to: email,
                    from: 'aruldjaduls@gmail.com',
                    subject: 'Wellcome To Arul Todo',
                    text: 'Thanks For Join ',
                    html: `<p>Hello ${name}, Wellcome to Todo-Fancy! Enjoy </p>`
                }
              sgMail.send(msg)

                    res.status(201).json({
                        err: false,
                        message: `Success to add ${newUser.name}`,
                        data: newUser,
                        token: jwt.jwtEncode({
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: `Please input email incorrect`
                    })
                })
            } else {
                res.status(400).json({message:'Email already registered!'})
            }
        })
        .catch( err => {
            res.status(500).json(err)
        })
    },

    signin : (req, res) => {
        let email = req.body.email
        let password = req.body.password

        User.findOne({email: email})
        .then( user => {
            if(hash.decode(password, user.password)) { 
                res.status(200).json({
                    err: false,
                    name: user.name,
                    token: jwt.jwtEncode({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    })
                })
            } else {
                res.status(400).json({message:"Password is wrong"})
                
            }
        })
        .catch(err => {
            res.status(500).json({err:true, err})
        })
    },

    


}