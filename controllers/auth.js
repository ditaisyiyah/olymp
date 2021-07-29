const { checkPassword } = require('../helpers/bcrypt')
const { Country } = require('../models')

class AuthCtr{
  static getRegist(req, res){
    const msg = req.query?.msg ?? []
    res.render('regist', {msg})
  }

  static postRegist(req, res){
    const {code, name, username, password} = req.body
    Country
    .create({code, name, username, password})
    .then((datum) => {
      res.redirect('/login')
    })
    .catch(err => {
      const errs = err.errors.map(el => el.message)
      res.redirect(`/regist?msg=${errs[0]}`)
    })
  }

  static getLogin(req, res){
    const msg = req.query?.msg ?? ''
    res.render('login', {msg})
  }

  static postLogin(req, res){
    const {username, password} = req.body
    Country
      .findOne({where: {username}})
      .then(datum => {
        if(datum){
          const status = checkPassword(password, datum.password)
          if(status){ 
            console.log(datum);
            req.session.isLoggedIn = true
            req.session.aydi = datum.id
            req.session.code = datum.code
            req.session.name = datum.name
            res.redirect('/countries')
          }else{
            throw new Error (`Invalid username and/or password`) 
          }
        }else{
          throw new Error (`Invalid username and/or password`)
        }
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })

  }
}

module.exports = AuthCtr