const { Country, Sport, Athlete } = require('../models')
const transporter = require('../nodemailer')

class CountryCtr{
  static welcome(req, res){
    const halo = Country.halo()
    res.render('welcome', {halo})
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
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          gender: req.body.gender,
          age: req.body.age,
          email: req.body.email, 
          SportId: req.body.SportId,
          CountryId: req.session.aydi,
        })
        .then((datum) => { 
          // res.send(datum)
          var mailOptions = {
            from: 'ditahacktiv@gmail.com',
            to: datum.email,
            subject: 'Olympic Registration',
            text: 'Hi! You recently are registed in Olympics!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

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
        first_name: req.body.name[0],
        last_name: req.body.name[1],
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email, 
        SportId: req.body.SportId,
        CountryId: req.session.aydi,
      },{ where: { id }, individualHooks: true }
      )
      .then(() => {
        const msg = `✅️ Athlete ID ${id} just updated ✅️`
        res.redirect(`/countries/athletes?msg=${msg}`)
      })
      .catch(err => {
        console.log(err)
        const errs = err.errors.map(el => el.message)
        res.redirect(`/countries/athletes/edit?err=${errs}`)
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
