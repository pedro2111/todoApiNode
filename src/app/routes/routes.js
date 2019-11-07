const TarefaDao = require('../DAO/tarefaDao');
const SistemaDao = require('../DAO/sistemaDao');
const UsuarioDao = require('../DAO/usuarioDao');
const passport = require('passport')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

module.exports = (app, mysqlConn) => { //exportando uma função com parametro app
    app.get('/', function (req, res) {
        res.send('olamundo');
    });

    app.get('/tarefas', (req, res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.listarTarefas()
            .then((rows) => {
                console.log(rows)
                res.send(rows)
            })
            .catch(err => console.log(err));

    });
    app.get('/tarefaslike/:termo', (req, res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.listarTarefasLike(req.params.termo)

            .then((rows) => {
                res.send(rows)
            })
            .catch(err => console.log(err));

    });
    app.get('/tarefas/:id', (req, res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.listarTarefasById(req.params.id)
            .then((rows) => {
                res.send(rows)
            })
            .catch(err => console.log(err));

    });
    app.get('/tarefassistema/:id', (req, res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.listarTarefasBySistema(req.params.id)
            .then((rows) => {
                res.send(rows)
            })
            .catch(err => console.log(err));

    });
    app.delete('/tarefas/:id', (req, res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.deletarTarefa(req.params.id)
            .then((rows) => {
                res.send(rows)
                console.log('tarefa deletada!' + req.params.id)
            })
            .catch(err => console.log(err));

    });
    app.post('/tarefas', (req, res) => {
        const tarefaDao = new TarefaDao(mysqlConn);
        tarefaDao.criarTarefa(req.body)
            .then((rows) => {
                res.send(rows)
            })
            .catch(err => console.log(err));

    });
    app.put('/tarefas', (req, res) => {
        const tarefaDao = new TarefaDao(mysqlConn);
        tarefaDao.atualizarTarefa(req.body)
            .then((rows) => {
                res.send('Tarefa atualizada com sucesso')
            })
            .catch(err => console.log(err));

    });
    app.get('/finalizartarefas/:id', (req, res) => {
        const tarefaDao = new TarefaDao(mysqlConn);
        tarefaDao.finalizarTarefa(req.params.id)
            .then((rows) => {
                res.send(rows)
            })
            .catch(err => console.log(err));

    });
    //-------------------SISTEMA---------------------------------
    app.get('/sistemas', (req, res) => {
        const sistemaDao = new SistemaDao(mysqlConn);

        sistemaDao.listarSistemas()
            .then((rows) => res.send(rows))
            .catch((err) => console.log(err))
    });
    app.get('/sistemas/:id', (req, res) => {
        const sistemaDao = new SistemaDao(mysqlConn);

        sistemaDao.listarSistemaById(req.params.id)
            .then((rows) => res.send(rows))
            .catch((err) => console.log(err))
    });
    app.post('/sistemas', (req, res) => {
        const sistemaDao = new SistemaDao(mysqlConn);

        sistemaDao.criarSistema(req.body)
            .then((rows) => res.send(rows))
            .catch((err) => console.log(err))
    });
    //---------------------USUARIOS----------------------------
    app.get('/usuario/:mat', (req, res) => {
        const usuarioDao = new UsuarioDao(mysqlConn)

        usuarioDao.listarUsuarioByMat(req.params.mat)
            .then((rows) => {
                res.send(rows)
            })
            .catch((err) => { console.log(err) })
    })
    app.post('/login', (req, res) => {

        const usuarioDao = new UsuarioDao(mysqlConn)
        let usuario = req.body;
        usuarioDao.listarUsuarioByMat(usuario.matricula)
            .then((user) => {

                if (user.length === 0) {
                    res.status(401).send('Usuario inválido')
                } else if (!bcrypt.compareSync(usuario.senha, user[0].senha)) {
                    res.status(401).send('Senha incorreta!')
                } else {
                    let payload = { subject: user[0].id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token, user })
                }

            })
            .catch((err) => console.log(err))

    })
    app.post('/usuario', (req, res) => {
        const usuarioDao = new UsuarioDao(mysqlConn)

        usuarioDao.criarUsuario(req.body)
            .then((rows) => res.send(rows))
            .catch((err) => console.log(err))
    })
    function verificarToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Requisição não autorizada!')
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(401).send('Requisição não autorizada!')
        }
        let payload = jwt.verify(token,'secretKey')
        if(!payload){
            return res.status(401).send('Requisição não autorizada!')
        }
        req.userId = payload.subject
        next()

    }


}