const express = require("express");
const conn = require("./models/db");
const bodyParser = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const masterpass = ("1234")
const PORT = 80
//import {erro,authorized,sucess} from "./results"

// Body parser
app.use(express.json());
// Autentica o JWT para dar acesso as rotas com Auth.
// Corta "Bearer" do Token em si.
function auth(req,res,next){
	const authtoken = req.headers['authorization']
	const bearer =  authtoken.split(' ');
	var token = bearer[1];
	if (authtoken != undefined){
		jwt.verify(token,masterpass,function(err,data){
			if(data){
				res.json(authorized(data))
				next();
			}else{res.status(401).send({err})}
		})
	}
}
// Gera um JWT
app.post("/auth",(req,res)=>{
	let senha = req.body.senha
	if(senha){
		console.log(senha)
		let token = jwt.sign({senha:senha},masterpass,{expiresIn:"6h"})
		res.json("Bearer token "+token)
	}else{console.log("undefined")}
})
// Tabela usuários.
// Exibe todos usuários cadastrados
app.get("/usuarios",auth, function (req, res) {
	conn.query("SELECT * FROM usuarios", function (err, row) {
		if (err) {
			res.status(400).send(erro(err));
		} else {res.status(200).send(sucess(row))}
	});
});
// Exibe um usuário em específico, mencionado no param
app.get("/usuarios/:id_usuario",auth, function (req, res) {
	var select = "SELECT * FROM usuarios where id_usuario=";
	conn.query(select + req.params.id_usuario, function (err, row) {
		if (err) {
			res.status(400).send(erro(err));
		} else {res.status(200).send(sucess(row))}
	});
});
// Atualiza o usuário do parametro
app.post("/usuarios",auth, function (req, res) {
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
				res.status(400).send(erro(err));
			} else {res.status(200).send(sucess(row))}
		}
	);
});
// Add um usuario
app.put("/usuarios/:id_usuario",auth, function (req, res) {
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
				res.status(400).send(erro(err));
			} else {res.status(200).send(sucess(row))}
		}
	);
});
// Deleta um usuário em específico, mencionado no param
app.delete("/usuarios/:id_usuario",auth, function (req, res) {
	var del = "DELETE FROM usuarios where id_usuario=";
	conn.query(del + req.params.id_usuario, function (err, row) {
		if (err) {
			res.status(400).send(erro(err));
		} else {res.status(200).send(sucess(row))}
	});
});
// ------------------------------------------------------------------------
//                      Endereços_usuarios
// Lista todos endereços de um determinado usuário
app.get("/enderecos-usuario/:idusuario",auth, function (req, res) {
	var idusuario = req.params.idusuario;
	var select =
		"SELECT * FROM enderecos_usuarios INNER JOIN usuarios ON id_usuarios=id_usuario WHERE id_usuarios=";
	conn.query(select + idusuario, function (err, row) {
		if (err) {
			res.status(400).send(erro(err));
		} else {res.status(200).send(sucess(row))}
	});
});
// Lista endereço especificado via ID
app.get("/enderecos-usuarios/:id_endereco_usuario",auth, function (req, res) {
	var idend = parseInt(req.params.id_endereco_usuario);
	var select = "select * from enderecos_usuarios where id_endereco_usuario=";
	conn.query(
		"select * from enderecos_usuarios where id_endereco_usuario=?",
		[idend],
		function (err, row) {
			if (err) {
				res.status(400).send(erro(err));
			} else {res.status(200).send(sucess(row))}
		}
	);
});
// Delete endereço especificado

app.delete("/enderecos-usuario/:id_endereco_usuario",auth, function (req, res) {
	var del = "delete from enderecos_usuarios where id_endereco_usuario=";
	conn.query(del + req.params.id_endereco_usuario, function (err, row) {
		if (err) {
			res.status(400).send(erro(err));
		} else {res.status(200).send(sucess(row))}
	});
});
// Adiciona novo endereço
app.post("/enderecos-usuario",auth, function (req, res) {
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
				res.status(400).send(erro(err));
			} else {res.status(200).send(sucess(row))}
		}
	);
});
app.put("/enderecos-usuario/:id_endereco_usuario",auth, function (req, res) {
	let idend = req.params.id_endereco_usuario;
	let where = "WHERE id_endereco_usuario=";
	conn.query(
		"UPDATE enderecos_usuarios SET id_usuario=?, logradouro=?,numero=?,cidade=?,uf=?,cep=?,bairro=?,complemento=?" +
			where +
			idend,
		[iduser, lograd, nmr, cidade, uf, cep, bairro],
		function (err, row) {
			if (err) {
				res.status(400).send(erro(err));
			} else {res.status(200).send(sucess(row))}
		}
	);
});
app.listen(PORT, function () {
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
function authorized(data) {
	console.log(
		{
			codigo: 200,
			status: "Permitido",
			mensagem: "Usuário autorizado.",
		},
		data
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
