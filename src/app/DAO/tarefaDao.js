class TarefaDao {
    constructor(mysqlConn){
        this._mysqlConn = mysqlConn;
    }

    listarTarefas(){
        return new Promise((resolve,reject) => {
            this._mysqlConn.query('select * from tarefa order by id desc', (err,rows,fields) => {
                if(err) return reject('Não foi possível buscar as tarefas' + err);

                return resolve(rows);
            });
        });
    }
    listarTarefasLike(termo){
        return new Promise((resolve,reject) => {
            this._mysqlConn.query('select * from tarefa where descricao like ? order by id desc',['%' + termo + '%'], (err,rows,fields) => {
                if(err) return reject('Não foi possível buscar as tarefas' + err);
                return resolve(rows);
            });
        });
    }
    listarTarefasById(id){
        return new Promise((resolve,reject) => {
            this._mysqlConn.query('select * from tarefa where id = ?',[id], (err,rows,fields) => {
                if(err) return reject('Não foi possível buscar as tarefas' + err);

                return resolve(rows);
            });
        });
    }
    listarTarefasBySistema(id){
        return new Promise((resolve,reject) => {
            this._mysqlConn.query('select * from tarefa where id_sistema = ? order by id desc',[id], (err,rows,fields) => {
                if(err) return reject('Não foi possível buscar as tarefas' + err);

                return resolve(rows);
            });
        });
    }
    deletarTarefa(id){
        return new Promise((resolve,reject) => {
            this._mysqlConn.query('delete from tarefa where id = ?',[id], (err,rows,fields) => {
                if(err) return reject('Não foi possível deletar a tarefa' + err);

                return resolve(rows);
            });
        });
    }
    criarTarefa(tarefa){
        return new Promise((resolve,reject) => {

            this._mysqlConn.query('insert into tarefa (id_sistema,id_cat,nome,descricao,status) values (?,?,?,?,?)',
            [tarefa.id_sistema,tarefa.id_cat,tarefa.nome,tarefa.descricao,tarefa.status],
            (err,rows,fields) => {
                
                if(err) return reject('Não foi possível criar a tarefa' + err);

                return resolve(rows);
            });
        });
    }
    atualizarTarefa(tarefa){
        return new Promise((resolve,reject) => {

            this._mysqlConn.query('update tarefa set id_sistema = ?,id_cat = ?,nome = ?,descricao = ?,status = ? where id = ?',
            [tarefa.id_sistema,tarefa.id_cat,tarefa.nome,tarefa.descricao,tarefa.status,tarefa.id],
            (err,rows,fields) => {
                
                if(err) return reject('Não foi possível atualizar a tarefa\n' + err);

                return resolve(rows);
            });
        });
    }
    finalizarTarefa(id){
        return new Promise((resolve,reject) => {

            this._mysqlConn.query('update tarefa set status = 1 where id = ?',
            [id],
            (err,rows,fields) => {
                
                if(err) return reject('Não foi possível atualizar a tarefa\n' + err);

                return resolve(rows);
            });
        });
    }
}

module.exports = TarefaDao;