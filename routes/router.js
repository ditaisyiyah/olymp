const AuthCtr = require('../controllers/auth')
const CountryCtr = require('../controllers/country')

const router = require('express').Router()

router.get('/', CountryCtr.welcome)

// ============= CREDENTIAL ROUTE
router.get('/countries', checkLogin, CountryCtr.home)

router.get('/countries/athletes', checkLogin, CountryCtr.getAthletes)

router.get('/countries/athletes/add', checkLogin, CountryCtr.addAthleteForm)
router.post('/countries/athletes/add', checkLogin, CountryCtr.addAthlete)

router.get('/countries/athletes/:id/edit', checkLogin, CountryCtr.editAthleteForm)
router.post('/countries/athletes/:id/edit', checkLogin, CountryCtr.editAthlete)

router.get('/countries/athletes/:id/delete', checkLogin, CountryCtr.delAthlete)


// ============= AUTH
router.get('/register', AuthCtr.getRegist)
router.post('/register', AuthCtr.postRegist)
router.get('/login', AuthCtr.getLogin)
router.post('/login', AuthCtr.postLogin)

function checkLogin (req, res, next) {
  if(req.session.isLoggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

module.exports = router