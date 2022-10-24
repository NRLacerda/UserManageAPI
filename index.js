const express = require("express");
const conn = require("./models/db");
const app = express();

// Tabela usuários.

// Exibe todos usuários cadastrados
app.get("/usuarios", function (req, res) {
	conn.query("SELECT * FROM usuarios", function (err, rows) {
		if (err) {
			res.send("error", err);
		} else {
			res.status(200).send(rows);
		}
	});
});
// Exibe um usuário em específico, mencionado no param
app.get("/usuarios/:id_usuario", function (req, res) {
	var sql= "SELECT * FROM usuarios where id_usuario="
    conn.query(sql + req.params.id_usuario,
		function (err, rows) {
			if (isNaN(req.params.id_usuario)) {
				res.status(400).send("400 - Erro, NaN!")
			} else {
                res.status(200).send(rows)			
            }
		}
	);
});
// Adiciona um usuário em específico
app.post("/usuarios/:nome/:sobrenome/:email/:telefone/:cpf", function(req,res){
    let nome = req.params.nome
    let sobrenome = req.params.sobrenome
    let email = req.params.email
    let telefone = req.params.telefone
    let cpf = req.params.cpf
    conn.query('INSERT INTO usuarios (nome, sobrenome, email, telefone, cpf) VALUES (?,?,?,?,?)',[nome,sobrenome,email,telefone,cpf],
        function (err, rows){
            if (err){
                res.status(400).send("error", err)
            }else{res.status(200).send(rows)}
        }
    )
})
// Atualiza o usuário do parametro
app.put("/usuarios/:id_usuario", function(req,res){
    let idusuario = req.params.id_usuario
    conn.query('UPDATE usuarios SET nome=sucodeuva WHERE id_usuario=?',[idusuario],
        /*function (err, rows){
            if (err){
                res.status(err)
            }else{
                res.status(rows)
            }
        }*/
    )
})
// Deleta um usuário em específico, mencionado no param
app.delete("/usuarios/:id_usuario", function (req, res) {
    var sql = "DELETE FROM usuarios where id_usuario="
	conn.query(sql + req.params.id_usuario,function (err, rows) {
			if (err) {
				res.status(400).send("error", err)
			} else {
				res.status(200).send(req.params.id_usuario + " deleted");
			}
		}
	);
});
// ------------------------------------------------------------------------
//                      Endereços_usuarios
// Lista todos endereços de um determinado usuário
app.get("enderecos-usuarios/:id_usuario", function (req,res){
    var idusuario= req.params.id_usuario
    conn.query('SELECT * FROM enderecos_usuarios INNER JOIN usuarios ON id_usuarios=id_usuario WHERE id_usuarios=?;',[idusuario], function(err,row){
    if (err){
        res.status(400).send("error", err)
    }else{res.status(200).send(row)}
    })
})
// Lista endereço especificado via ID
app.get("enderecos-usuario/:id_endereco_usuario", function (req,res){
    var idendusuario= req.params.id_endereco_usuario
    var sql='select * from enderecos_usuarios where id_endereco_usuario='
    var sql2 = conn.query(sql+idendusuario)
    console.log(sql2)
})




// Envia statuscode
app.get("/", function (req, res) {
	res.status(200).send(
	"Codigo:200\nStatus:Sucesso! \n Mensagem:Acao realizada com sucesso!"
	);
});
app.listen(4242, function () {
	console.log("Server running!");
});

/*
-----------------
Teste add info 
-----------------
?= coloca uma variável no sql
res.send = envia uma resposta em forma de json para request da api
-----------------
DB DRIVER
To test whether a row exists in a MySQL table or not, use exists condition. 
The exists condition can be used with subquery. 
It returns true when row exists in the table, otherwise false is returned. 
True is represented in the form of 1 and false is represented as 0.
-----------------
*/