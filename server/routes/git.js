const router = require('express').Router(),
      { getMyRepos, getStarredRepos, createRepo, searchStarredRepo, getUserRepos} = require('../controllers/git'),
      { authenticate, authorize } = require('../middlewares/auth')



router
    .get('/', authenticate, getMyRepos)
    .post('/', authenticate, authorize, createRepo)
    .get('/starred', authenticate, getStarredRepos)
    .get('/searchStarred/:input', authenticate, searchStarredRepo)
    .get('/:user', authenticate, getUserRepos)


module.exports = router