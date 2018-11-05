const express = require('express'),
  routes = express.Router()

// routes.use('/api', require('./user'))
routes.use('/api/user', require('./user'))
routes.use('/api/task', require('./task'))

routes.use((req, res) => res.status(404).json({
  message: 'No page here. See API documentation for reference.'
}))

module.exports = routes