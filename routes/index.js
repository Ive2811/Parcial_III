var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
//const data = require('../userData');
const methods = require('../methods');
const User = require('../models/user');

//Constantes para rutas de páginas, login y register.
const loginPage = "../views/pages/login";
const registerPage ="../views/pages/register";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Senior Help App' });
});

//Registro de rutas.
router.get('/home', (req, res) => {
  if(req.user){
    res.render('home', {
      userName: req.user.fullName
    });
  } else {
    res.render(loginPage, {
      message: "Debe iniciar sesión para continuar.",
      messageClass: "alert-danger"
    })
  }
});

router.get('/login', (req, res) => {
  res.render(loginPage, { title: 'Iniciar Sesión' });
});

router.get('/register', (req, res) => {
  res.render(registerPage, { title: 'Registrarse' });
});

router.post('/register', async (req,res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  //Validación.
  if (password === confirmPassword){
    user = await User.findOne({ email:email})
    .then(user => {
      if(user) {
        res.render(registerPage,{
        message:"El usuario ya está registrado.",
        messageClass: "alert-danger d-flex align-items-center alert-dismissible fade show"
      });

    }else{
      const hashedPassword = methods.getHashedPassword(password);
      const userDB = new User({
        'fullName': fullName,
        'email': email,
        'password': hashedPassword
      });
      userDB.save();
    
    res.render(loginPage, {
      message: "Registro exitoso. Inicie sesión.",
      messageClass: "alert-success d-flex align-items-center alert-dismissible fade show"
    });
  }
})
  }else {
    res.render(registerPage, {
      message: "Las contraseñas no coinciden.",
      messageClass: "alert-danger d-flex align-items-center alert-dismissible fade show"
    });
  }
});
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const pHash = methods.getHashedPassword(password);

    user = await User.findOne({ email: email, password: pHash})
    .then(user => {
      if (user) {
        const authToken = methods.generateToken();
        methods.authTokens[authToken] = user; //Guardar token.
        res.cookie('AuthToken', authToken); //Setting token.
        res.redirect('/home'); //Redirect.
      } else {
        res.render(loginPage, {
          message: "Usuario o clave inválidos.",
          messageClass: "alert-danger d-flex align-items-center alert-dismissible fade show"
        });
      }
    })
  });
router.get('/logout', (req, res) => {
  res.clearCookie('AuthToken');
  return res.redirect('/');
});

module.exports = router;
