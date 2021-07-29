const { Country, Sport, Athlete } = require('../models')

class CountryCtr{
  static welcome(req, res){
    res.render('welcome')
  }

  static home(req, res){
    const payload = {}
    payload.name = req.session.name
    Country
      .findAll({
        include: [Athlete]
      })
      .then(data => {
        // res.send(data)
        payload.data = data
        res.render('countries/country', payload)
      })
      .catch(err => {
        console.log(err)
        res.send(err.message)
      })
  }

  static sports(req, res){
    const payload = {} 
    payload.name = req.session.name
    Sport
      .findAll({
        include: [{ 
          model: Athlete,
          where: {CountryId: req.session.aydi}
        }]
      })
      .then(data => {
        // res.send(data)
        payload.data = data
        res.render('countries/sports', payload)
      })
      .catch(err => {
        console.log(err)
        res.send(err.message)
      })
  }

  static getAthletes(req, res){
    const payload = {}
    payload.msg = req.query?.msg ?? ''
    payload.name = req.session.name    
    Athlete
      .findAll({
        where: { CountryId: req.session.aydi },
        // order: [['name', 'ASC']],
        include: [Sport]
      })
      .then(data => {
        // res.send(data)
        payload.data = data
        res.render('countries/athletes', payload)
      })
      .catch(err => {
        console.log(err)
        res.send(err.message)
      })
  }
  
  static addAthleteForm(req, res){
    const payload = {}
    payload.errs = req.query?.err?.split(',') ?? []
    Sport
      .findAll()
      .then(data => {
        payload.data = data
        res.render('countries/addAthlete', payload)
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
    }
    
    static addAthlete(req, res){
      Athlete
        .create({
          name: req.body.name,
          age: req.body.age,
          phone_number: req.body.phone_number,
          email: req.body.email, 
          SportId: req.body.SportId,
          CountryId: req.session.aydi,
        })
        .then((datum) => {
          const msg = `✅️ Athlete ID ${datum.id} just added ✅️`
          res.redirect(`/countries/athletes?msg=${msg}`)
        })
        .catch(err => {
          console.log(err)
          const errs = err.errors.map(el => el.message)
          res.redirect(`/countries/athletes/add?err=${errs}`)
        })
    }
    
    static editAthleteForm(req, res){
      const id = req.params.id
      const payload = {}
      payload.errs = req.query?.err?.split(',') ?? []
      Athlete
        .findByPk(id)
        .then(datum => {
          payload.datum = datum
          return Sport.findAll()
        })
        .then(data=>{
          payload.data = data
          res.render('countries/editAthlete', payload)
        })
        .catch(err => {
          console.log(err);
          res.send(err)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
  }

  static editAthlete(req, res){
    const id = req.params.id
    Athlete
      .update({
        name: req.body.name,
        age: req.body.age,
        phone_number: req.body.phone_number,
        email: req.body.email, 
        SportId: req.body.SportId,
        CountryId: req.session.aydi,
      },{ where: { id } })
      .then(() => {
        const msg = `✅️ Athlete ID ${id} just updated ✅️`
        res.redirect(`/countries/athletes?msg=${msg}`)
      })
      .catch(err => {
        console.log(err)
        const errs = err.errors.map(el => el.message)
        res.redirect(`/countries/athletes/add?err=${errs}`)
      })
  }

  static delAthlete(req, res){
    const id = req.params.id
    Athlete
      .destroy({where: {id}})
      .then(num => {
        if(!num) throw new Error (`❌️ No Athlete with ID ${id} ❌️`)
        const msg = `✅️ Athelete ID ${id} just removed ✅️`
        res.redirect(`/countries/athletes?msg=${msg}`)
      })
      .catch(err => {
        console.log(err)
        res.send(err.message)
      })
  }

  static logout(req, res){
    req.session.isLoggedIn = false
    res.redirect('/')
  }

}

module.exports = CountryCtr
