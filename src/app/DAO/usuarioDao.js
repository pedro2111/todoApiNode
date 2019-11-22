const bcrypt = require('bcrypt');
const saltRounds = 10;

class UsuarioDao {
    constructor(mysqlConn) {
        this._mysqlConn = mysqlConn;
    }
    listarUsuarioByMat(mat) {

        return new Promise((resolve, reject) => {
            this._mysqlConn.query('select * from usuario where matricula like ?', [mat], (err, rows, fileds) => {

                if (err) return reject('Usuario nao encontrado!' + err);

                return resolve(rows);
            })
        })
    }
    listarUsuario() {

        return new Promise((resolve, reject) => {
            this._mysqlConn.query('select * from usuario', (err, rows, fileds) => {

                if (err) return reject('Usuario nao encontrado!' + err);

                return resolve(rows);
            })
        })
    }
    criarUsuario(usuario) {
        var senhaCript = bcrypt.hashSync(usuario.senha, saltRounds);
        return new Promise((resolve, reject) => {
            this._mysqlConn.query('insert into usuario (nome,matricula,senha) values (?,?,?)',
                [usuario.nome, usuario.matricula, senhaCript],
                (err, rows, fields) => {
                    if (err) return reject('Erro ao cadastrar o usuario!' + err)

                    return resolve(rows)
                }

            );
        })
    }
}
module.exports = UsuarioDao