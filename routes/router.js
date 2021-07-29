const AuthCtr = require('../controllers/auth')
const CountryCtr = require('../controllers/country')

const router = require('express').Router()

router.get('/', checkLogout, CountryCtr.welcome)

// ============= CREDENTIAL ROUTE
router.get('/countries', checkLogin, CountryCtr.home)

router.get('/countries/sports', checkLogin, CountryCtr.sports)

router.get('/countries/athletes', checkLogin, CountryCtr.getAthletes)

router.get('/countries/athletes/add', checkLogin, CountryCtr.addAthleteForm)
router.post('/countries/athletes/add', checkLogin, CountryCtr.addAthlete)

router.get('/countries/athletes/:id/edit', checkLogin, CountryCtr.editAthleteForm)
router.post('/countries/athletes/:id/edit', checkLogin, CountryCtr.editAthlete)

router.get('/countries/athletes/:id/delete', checkLogin, CountryCtr.delAthlete)

router.get('/countries/logout', checkLogin, CountryCtr.logout)

// ============= AUTH
router.get('/register', checkLogout, AuthCtr.getRegist)
router.post('/register', checkLogout, AuthCtr.postRegist)
router.get('/login', checkLogout, AuthCtr.getLogin)
router.post('/login', checkLogout, AuthCtr.postLogin)

function checkLogin (req, res, next) {
  if(req.session.isLoggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

function checkLogout (req, res, next) {
  if(!req.session.isLoggedIn){
    next()
  }else{
    res.redirect('/countries')
  }
}

module.exports = router