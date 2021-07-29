const express = require('express')
const session = require('express-session')
const router = require('./routes/router')
const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

app.use(router)

app.set('view engine', 'ejs')

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
})