const { decoded } = require('../helpers/jasonWebToken')
const User = require('../models/user')

const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    isLogin : (req, res, next) => {
        
        let jtoken = req.headers.jtoken
        
        if ( jtoken ) {
            let user = decoded(jtoken)
            req._id = user._id
            next()
        }else {
            res.status(404).json({ massage : 'Belum Login', error : 'sorry, you are not logged in, please log in'})
        }

    },
    isTokenStillValid : (req, res, next) => {

        let _id = req._id
        
        User
            .findById(_id)
            .then( user => {
                if ( user) {
                    next()
                }else {
                    res.status(500).json({ message : 'token tidak valid', error : ' your token is not valid!'})
                }
            })
    },
    isAuthorize :  (req,res, next) => {
        let documentId = ObjectId(req.params.id)
        let _id = req._id
       
        User
            .findById(_id)
            .then( user => {
                let document = user.todoes.find( doc => {
                    return doc.equals(documentId)
                })
                
                if ( document ) {
                    next()
                }else {
                    res.status(500).json({ message : 'Error while authorize user', error : 'request is denied, you do not have access rights'})
                }
            })
            .catch( error => {
                res.status(500).json({ message : 'Error while authorize user', error : error.message})
            })

    }
}