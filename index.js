const express = require("express");
const conn = require("./models/db");
const app = express();
const bodyParser = require("body-parser");

// Body parser
app.use(express.json());
// Tabela usuários.

// Exibe todos usuários cadastrados
app.get("/usuarios", function (req, res) {
	conn.query("SELECT * FROM usuarios", function (err, row) {
		if (err) {
			erro(err);
		} else {
			sucess(row);
		}
	});
});
// Exibe um usuário em específico, mencionado no param
app.get("/usuarios/:id_usuario", function (req, res) {
	var select = "SELECT * FROM usuarios where id_usuario=";
	conn.query(select + req.params.id_usuario, function (err, row) {
		if (err) {
			erro(err);
		} else {
			sucess(row);
		}
	});
});
// Adiciona um usuário em específico
app.post("/teste", function (req, res) {
	console.log(req.body.teste);
});
// Atualiza o usuário do parametro
app.put("/usuarios/:id_usuario/:nome", function (req, res) {
	let idusuario = req.params.id_usuario;
	let sql = "update usuarios set nome=";
	let sql2 = '"';
	let sql3 = "";
	let nome = req.params.nome;
	let where = "where id_usuario=";
	conn.query(sql + sql2 + nome + sql2 + where + idusuario, function (err, row) {
		if (err) {
			erro(err);
		} else {
			sucess(row);
		}
	});
});
// Deleta um usuário em específico, mencionado no param
app.delete("/usuarios/:id_usuario", function (req, res) {
	var del = "DELETE FROM usuarios where id_usuario=";
	conn.query(del + req.params.id_usuario, function (err, row) {
		if (err) {
			erro(err);
		} else {
			sucess(row);
		}
	});
});
// ------------------------------------------------------------------------
//                      Endereços_usuarios
// Lista todos endereços de um determinado usuário
app.get("enderecos-usuario/:id_usuario", function (req, res) {
	var idusuario = req.params.id_usuario;
	conn.query(
		"SELECT * FROM enderecos_usuarios INNER JOIN usuarios ON id_usuarios=id_usuario WHERE id_usuarios=?;",
		[idusuario],
		function (err, row) {
			if (err) {
				erro(err);
			} else {
				sucess(row);
			}
		}
	);
});
// Lista endereço especificado via ID
app.get("enderecos-usuario/:id_endereco_usuario", function (req, res) {
	var select = "select * from enderecos_usuarios where id_endereco_usuario=";
	conn.query(select + req.params.id_endereco_usuario, function (err, row) {
		if (err) {
			erro(err);
		} else {
			sucess(row);
		}
	});
	console.log(sql2);
});
// Delete endereço especificado

app.delete("enderecos-usuario/:id_endereco_usuario", function (req, res) {
	var del = "delete from enderecos_usuarios where id_endereco_usuario=";
	conn.query(del + req.params.id_endereco_usuario, function (err, rows) {
		if (err) {
			erro(err);
		} else {
			sucess(row);
		}
	});
});
// Adiciona novo endereço
app.post("enderecos-usuario", function (req, res) {
	let iduser = parseInt(req.body.id_usuario);
	let lograd = req.body.logradouro;
	let nmr = req.body.numero;
	let cidade = req.body.cidade;
	let uf = req.body.uf;
	let cep = req.body.cep;
	let bairro = req.body.bairro;
	conn.query(
		"INSERT INTO enderecos_usuarios(id_usuarios, logradouro, numero,cidade,uf,cep,bairro) VALUES ((SELECT id_usuario from usuarios WHERE id_usuario=?),?,?,?,?,?,?);",
		[iduser],
		[lograd],
		[nmr],
		[cidade],
		[uf],
		[cep],
		[bairro],
		function (err, row) {
			if (err) {
				erro(err);
			} else {
				sucess(row);
			}
		}
	);
});
app.put("enderecos-usuario/:id_endereco_usuario", function (req, res) {
	let idend = req.params.id_endereco_usuario;
	let where = "WHERE id_endereco_usuario=";
	conn.query(
		"UPDATE enderecos_usuarios SET id_usuario=?, logradouro=?,numero=?,cidade=?,uf=?,cep=?,bairro=?,complemento=?" +
			where +
			idend,
		[iduser],
		[lograd],
		[nmr],
		[cidade],
		[uf],
		[cep],
		[bairro],
		function (err, row) {
			if (err) {
				erro(err);
			} else {
				sucess(row);
			}
		}
	);
});
app.listen(4242, function () {
	console.log("Server running!");
});
function erro(err) {
	console.log(
		{
			codigo: 404,
			status: "erro",
			mensagem: "Erro",
		},
		err
	);
}
function sucess(row) {
	console.log(
		{
			codigo: 200,
			status: "Sucesso",
			mensagem: "Requisição bem sucedida.",
		},
		row
	);
}
/*
-----------------
DB DRIVER
To test whether a row exists in a MySQL table or not, use exists condition. 
The exists condition can be used with subquery. 
It returns true when row exists in the table, otherwise false is returned. 
True is represented in the form of 1 and false is represented as 0.
-----------------
*/
