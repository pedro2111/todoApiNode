const TarefaDao = require('../DAO/tarefaDao');
const SistemaDao = require('../DAO/sistemaDao');

module.exports = (app,mysqlConn) => { //exportando uma função com parametro app
    app.get('/', function (req, res) {
        res.send('olamundo');
    });

    app.get('/tarefas', (req,res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.listarTarefas()
        .then((rows) => {
            console.log(rows)
            res.send(rows)
        })        
        .catch(err => console.log(err));

    });
    app.get('/tarefaslike/:termo', (req,res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.listarTarefasLike(req.params.termo)
 
        .then((rows) => {
            res.send(rows)
        })        
        .catch(err => console.log(err));

    });
    app.get('/tarefas/:id', (req,res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.listarTarefasById(req.params.id)
        .then((rows) => {
            res.send(rows)
        })        
        .catch(err => console.log(err));

    });
    app.get('/tarefassistema/:id', (req,res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.listarTarefasBySistema(req.params.id)
        .then((rows) => {
            res.send(rows)
        })        
        .catch(err => console.log(err));

    });
    app.delete('/tarefas/:id', (req,res) => {
        const tarefaDao = new TarefaDao(mysqlConn);

        tarefaDao.deletarTarefa(req.params.id)
        .then((rows) => {
            res.send('Tarefa Deletada com sucesso')
        })        
        .catch(err => console.log(err));

    });
    app.post('/tarefas', (req,res) => {
        const tarefaDao = new TarefaDao(mysqlConn);
        tarefaDao.criarTarefa(req.body)
        .then((rows) => {
            res.send(rows)
        })        
        .catch(err => console.log(err));

    });
    app.put('/tarefas', (req,res) => {
        const tarefaDao = new TarefaDao(mysqlConn);
        tarefaDao.atualizarTarefa(req.body)
        .then((rows) => {
            res.send('Tarefa atualizada com sucesso')
        })        
        .catch(err => console.log(err));

    });
    //-------------------SISTEMA---------------------------------
    app.get('/sistemas', (req,res) => {
        const sistemaDao = new SistemaDao(mysqlConn);

        sistemaDao.listarSistemas()
        .then((rows) => res.send(rows))
        .catch((err) => console.log(err))
    });
    app.get('/sistemas/:id', (req,res) => {
        const sistemaDao = new SistemaDao(mysqlConn);

        sistemaDao.listarSistemaById(req.params.id)
        .then((rows) => res.send(rows))
        .catch((err) => console.log(err))
    });
    app.post('/sistemas', (req,res) => {
        const sistemaDao = new SistemaDao(mysqlConn);

        sistemaDao.criarSistema(req.body)
        .then(() => res.send('Sistema criado com sucesso'))
        .catch((err) => console.log(err))
    });
    
    
}