const express = require("express");
const bodyParser = require("express");
const conn = require("./models/db");
const app = express();
const jwt = require('jsonwebtoken');
const masterpass = ("1234")

// Body parser
app.use(express.json());

function auth(req,res,next){
	const authtoken = req.headers['authorization']
	if (authtoken != undefined){
		jwt.verify(authtoken,masterpass,function(err,data){
			if(data){
				res.send(sucess(data))
				next();
			}else{res.status(401);res.json({err:"Não autorizado ",err})}
		})
	}
}
app.post("/auth",(req,res)=>{
	var user = req.body.senha
	const token = jwt.sign({senha:user},masterpass,{expiresIn:"20h"})
	res.json(token)
})

app.get("/testes",auth,(req,res)=>{
	console.log("autenticou!");
	res.send(authtoken)
})
// Tabela usuários.

// Exibe todos usuários cadastrados
app.get("/usuarios", function (req, res) {
	conn.query("SELECT * FROM usuarios", function (err, row) {
		if (err) {
			res.json(erro(err));
		} else {res.json(sucess(row))}
	});
});
// Exibe um usuário em específico, mencionado no param
app.get("/usuarios/:id_usuario", function (req, res) {
	var select = "SELECT * FROM usuarios where id_usuario=";
	conn.query(select + req.params.id_usuario, function (err, row) {
		if (err) {
			res.json(erro(err));
		}else {res.json(sucess(row))}
	});
});
// Atualiza o usuário do parametro
app.post("/usuarios", function (req, res) {
	let nome = req.body.nome;
	let sobrenome = req.body.sobrenome;
	let email = req.body.email;
	let telefone = req.body.telefone;
	let cpf = req.body.cpf;
	conn.query(
		"INSERT INTO usuarios(nome, sobrenome, email,telefone,cpf) VALUES (?,?,?,?,?);",
		[nome, sobrenome, email, telefone, cpf],
		function (err, row) {
			if (err) {
				res.json(erro(err));
			} else {res.json(sucess(row))
			}
		}
	);
});
// Add um usuario
app.put("/usuarios/:id_usuario", function (req, res) {
	let iduser = req.params.id_usuario;
	let nome = req.body.nome;
	let sobrenome = req.body.sobrenome;
	let email = req.body.email;
	let telefone = req.body.telefone;
	let cpf = req.body.cpf;
	conn.query(
		"UPDATE usuarios set nome=?, sobrenome=?, email=?,telefone=?,cpf=?",
		[nome][sobrenome][email][telefone][cpf],
		" WHERE id_usuario=" + iduser,
		function (err, row) {
			if (err) {
				res.json(erro(err));
			} else {res.json(sucess(row))}
		}
	);
});
// Deleta um usuário em específico, mencionado no param
app.delete("/usuarios/:id_usuario", function (req, res) {
	var del = "DELETE FROM usuarios where id_usuario=";
	conn.query(del + req.params.id_usuario, function (err, row) {
		if (err) {
			res.json(erro(err));
		} else {res.json(sucess(row))}
	});
});
// ------------------------------------------------------------------------
//                      Endereços_usuarios
// Lista todos endereços de um determinado usuário
app.get("/enderecos-usuario/:idusuario", function (req, res) {
	var idusuario = req.params.idusuario;
	var select =
		"SELECT * FROM enderecos_usuarios INNER JOIN usuarios ON id_usuarios=id_usuario WHERE id_usuarios=";
	conn.query(select + idusuario, function (err, row) {
		if (err) {
			res.json(erro(err));
		} else {res.json(sucess(row))}
	});
});
// Lista endereço especificado via ID
app.get("/enderecos-usuarios/:id_endereco_usuario", function (req, res) {
	var idend = parseInt(req.params.id_endereco_usuario);
	var select = "select * from enderecos_usuarios where id_endereco_usuario=";
	conn.query(
		"select * from enderecos_usuarios where id_endereco_usuario=?",
		[idend],
		function (err, row) {
			if (err) {
				res.json(erro(err));
			} else {res.json(sucess(row))}
		}
	);
});
// Delete endereço especificado

app.delete("/enderecos-usuario/:id_endereco_usuario", function (req, res) {
	var del = "delete from enderecos_usuarios where id_endereco_usuario=";
	conn.query(del + req.params.id_endereco_usuario, function (err, row) {
		if (err) {
			res.json(erro(err));
		} else {res.json(sucess(row))}
	});
});
// Adiciona novo endereço
app.post("/enderecos-usuario", function (req, res) {
	let iduser = parseInt(req.body.id_usuario);
	let lograd = req.body.logradouro;
	let nmr = req.body.numero;
	let cidade = req.body.cidade;
	let uf = req.body.uf;
	let cep = req.body.cep;
	let bairro = req.body.bairro;
	conn.query(
		"INSERT INTO enderecos_usuarios(id_usuarios, logradouro, numero,cidade,uf,cep,bairro) VALUES ((SELECT id_usuario from usuarios WHERE id_usuario=?),?,?,?,?,?,?);",
		[iduser, lograd, nmr, cidade, uf, cep, bairro],
		function (err, row) {
			if (err) {
				res.json(erro(err));
			}else {res.json(sucess(row))}
		}
	);
});
app.put("/enderecos-usuario/:id_endereco_usuario", function (req, res) {
	let idend = req.params.id_endereco_usuario;
	let where = "WHERE id_endereco_usuario=";
	conn.query(
		"UPDATE enderecos_usuarios SET id_usuario=?, logradouro=?,numero=?,cidade=?,uf=?,cep=?,bairro=?,complemento=?" +
			where +
			idend,
		[iduser, lograd, nmr, cidade, uf, cep, bairro],
		function (err, row) {
			if (err) {
				res.json(erro(err));
			}else {res.json(sucess(row))}
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
