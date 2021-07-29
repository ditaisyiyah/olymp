const CountryCtr = require('../controllers/country')

const router = require('express').Router()

router.get('', checkLogin, CountryCtr.home)

router.get('/sponsors', checkLogin, CountryCtr.sponsors)

router.get('/sports', checkLogin, CountryCtr.sports)

router.get('/athletes', checkLogin, CountryCtr.getAthletes)

router.get('/athletes/add', checkLogin, CountryCtr.addAthleteForm)
router.post('/athletes/add', checkLogin, CountryCtr.addAthlete)

router.get('/athletes/:id/edit', checkLogin, CountryCtr.editAthleteForm)
router.post('/athletes/:id/edit', checkLogin, CountryCtr.editAthlete)

router.get('/athletes/:id/delete', checkLogin, CountryCtr.delAthlete)

router.get('/logout', checkLogin, CountryCtr.logout)

function checkLogin (req, res, next) {
  if(req.session.isLoggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

module.exports = { countryRouter: router }