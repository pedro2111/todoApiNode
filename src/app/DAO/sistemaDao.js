class SistemaDao {
    constructor(mysqlConn){
        this._mysqlConn = mysqlConn;
    }
    criarSistema(sistema){
        return new Promise((resolve,reject) => {

            this._mysqlConn.query('insert into sistema (nome) values (?)',
            [sistema.nome],
            (err,rows,fields) => {
                
                if(err) return reject('Não foi possível criar o sistema' + err);

                return resolve(rows);
            });
        });
    }
    listarSistemas(){
        return new Promise((resolve,reject) => {

            this._mysqlConn.query('select * from sistema',
            (err,rows,fields) => {
                
                if(err) return reject('Não foi possível listar os sistemas' + err);

                return resolve(rows);
            });
        });
    }

    listarSistemaById(id){
        return new Promise((resolve,reject) => {

            this._mysqlConn.query('select * from sistema where id = ?',[id],
            (err,rows,fields) => {
                
                if(err) return reject('Não foi possível listar os sistemas' + err);

                return resolve(rows);
            });
        });
    }
}
module.exports = SistemaDao;