const uuid = require('uuid/v4')
const sessao = require('express-session')
//const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UsuarioDao = require('../app/DAO/usuarioDao')


module.exports = (passport) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'matricula',
            passwordField: 'senha'
        },
        (matricula, senha, done) => {
            UsuarioDao.listarUsuarioByMat(matricula)
                .then((usuario) => {
                    console.log("listagem de usuario" + usuario)
                    if (!usuario) {
                        return (null, false, { message: 'essa conta não existe' })
                    }
                    if (usuario.senha === senha) {
                        return done(null, usuario)
                    } else {
                        return done(null, false, { message: 'senha incorreta!' })

                    }
                })
        }


    ));

    passport.serializeUser((usuario, done) => {
        done(null, usuario.matricula)
    });

    passport.deserializeUser((mat, done) => {
        UsuarioDao.listarUsuarioByMat(mat)
            .then((usuario) => {
                done(null, usuario)
            })

    })

}