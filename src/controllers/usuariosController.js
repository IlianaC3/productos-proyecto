const { usuariosDao } = require('../services/index');
const logger = require('../utils/logger');

class UsuariosController {
   async loginUser(req, res) {
      let msg = '';
      if (req.user.email === -1) {
         logger.error('Usuario no existe')
         msg = 'Usuario no existe';
         req.logout(function (err) {
            if (err) { return next(err); }
            res.render('content/error', { data: msg });
         });
      } else if (req.user.email === 0) {
         logger.warn('La contraseña no es la correcta')
         msg = 'Contraseña incorrecta';
         req.logout(function (err) {
            if (err) { return next(err); }
            res.render('content/error', { data: msg });
         });
      } else {
         logger.info('Usuario ingresa')
         res.redirect('/');
      }

   }

   async signupUser(req, res) {
      let msg = '';
      if (req.user.data === -1) {
         logger.error('Usuario ya existe')
         msg = 'El usuario ya existe'
         req.logout(function (err) {
            if (err) { return next(err); }
            res.render('content/error', { data: msg });
         });
      } else {
         if (req.body.password == req.body.passwordVerification) {
            let user = {
               email: req.body.username,
               nombre: req.body.name,
               password: req.body.password,
               direccion: req.body.address,
               telefono: `${req.body.prefix}${req.body.phone}`,
               edad: req.body.age,
               foto: req.file.filename
            }
            const result = await usuariosDao.save(user).then((result) => {
               return result
            });
            req.logout(function (err) {
               if (result !== null) {
                  logger.info(`Nuevo usuario ${user.email} registrado`)
                  res.status(200).json({
                     message: `Usuario registrado`,
                     result: user
                  });
               } else {
                  logger.warn(`Usuario ${user.email} no se pudo registrar`)
                  res.status(201).json({
                     error: `No registrado`,
                  });
               }
            })
         } else {
            logger.warn(`Contraseñas de ${req.body.username} no coinciden`)
            req.logout(function (err) {
               res.status(201).json({
                  error: `Contraseñas no coinciden`,
               });
            });
         }
      }
   }
}

module.exports = UsuariosController;