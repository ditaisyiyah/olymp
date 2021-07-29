const AuthCtr = require('../controllers/auth')
const CountryCtr = require('../controllers/country')
const { countryRouter } = require('./country')

const router = require('express').Router()

router.get('/', checkLogout, CountryCtr.welcome)

// ============= AUTH
router.get('/register', checkLogout, AuthCtr.getRegist)
router.post('/register', checkLogout, AuthCtr.postRegist)
router.get('/login', checkLogout, AuthCtr.getLogin)
router.post('/login', checkLogout, AuthCtr.postLogin)

// ============= CREDENTIAL ROUTE
router.use('/countries', countryRouter)

function checkLogout (req, res, next) {
  if(!req.session.isLoggedIn){
    next()
  }else{
    res.redirect('/countries')
  }
}

module.exports = router