const express = require("express");
const conn = require("./models/db");
const app = express();
const bodyParser = require("body-parser")

// Body parser
app.use(express.json());
// Tabela usuários.

// Exibe todos usuários cadastrados
app.get("/usuarios", function (req, res) {
	conn.query("SELECT * FROM usuarios", function (err, row) {
        if(err){
            res.json({
                "codigo": 404,
                "status":"erro",
                "mensagem":"Erro"}
                )
        }else{res.json({
            "codigo": 200,
            "status":"Sucesso",
            "mensagem":"Requisição bem sucedida."}).send(row)}
	});
});
// Exibe um usuário em específico, mencionado no param
app.get("/usuarios/:id_usuario", function (req, res) {
	var sql= "SELECT * FROM usuarios where id_usuario="
    conn.query(sql + req.params.id_usuario,
		function (err, row) {
            if(err){
                res.json({
                    "codigo": 404,
                    "status":"erro",
                    "mensagem":"Erro"}
                    )
            }else{res.json({
                "codigo": 200,
                "status":"Sucesso",
                "mensagem":"Requisição bem sucedida."}).send(row)}
		}
	);
});
// Adiciona um usuário em específico
app.post("/teste", function(req,res){
    console.log(req.body.teste)
})
// Atualiza o usuário do parametro
app.put("/usuarios/:id_usuario/:nome", function(req,res){
    let idusuario = req.params.id_usuario;let sql = "update usuarios set nome=";let sql2='"';let sql3= "";let nome=req.params.nome;let where="where id_usuario="
    conn.query(sql+sql2+nome+sql2+where+idusuario,
        function (err, row){
            if(err){
                res.json({
                    "codigo": 404,
                    "status":"erro",
                    "mensagem":"Erro"}
                    )
            }else{res.json({
                "codigo": 200,
                "status":"Sucesso",
                "mensagem":"Requisição bem sucedida."}).send(row)}
        }
    )
})
// Deleta um usuário em específico, mencionado no param
app.delete("/usuarios/:id_usuario", function (req, res) {
    var sql = "DELETE FROM usuarios where id_usuario="
	conn.query(sql + req.params.id_usuario,function (err, row) {
        if(err){
            res.json({
                "codigo": 404,
                "status":"erro",
                "mensagem":"Erro"}
                )
        }else{res.json({
            "codigo": 200,
            "status":"Sucesso",
            "mensagem":"Requisição bem sucedida."}).send(row)}
		}
	);
});
// ------------------------------------------------------------------------
//                      Endereços_usuarios
// Lista todos endereços de um determinado usuário
app.get("enderecos-usuarios/:id_usuario", function (req,res){
    var idusuario= req.params.id_usuario
    conn.query('SELECT * FROM enderecos_usuarios INNER JOIN usuarios ON id_usuarios=id_usuario WHERE id_usuarios=?;',[idusuario], function(err,row){
        if(err){
            res.json({
                "codigo": 404,
                "status":"erro",
                "mensagem":"Erro"}
                )
        }else{res.json({
            "codigo": 200,
            "status":"Sucesso",
            "mensagem":"Requisição bem sucedida."}).send(row)}
    })
})
// Lista endereço especificado via ID
app.get("enderecos-usuario/:id_endereco_usuario", function (req,res){
    var sql='select * from enderecos_usuarios where id_endereco_usuario='
    conn.query(sql+req.params.id_endereco_usuario, function(err,row){
        if(err){
            res.json({
                "codigo": 404,
                "status":"erro",
                "mensagem":"Erro"}
                )
        }else{res.json({
            "codigo": 200,
            "status":"Sucesso",
            "mensagem":"Requisição bem sucedida."}).send(row)}
    })
    console.log(sql2)
})
// Delete endereço especificado

app.delete("enderecos-usuario/:id_endereco_usuario",function(req,res){
    var sql = "delete from enderecos_usuarios where id_endereco_usuario="
    conn.query(sql+req.params.id_endereco_usuario,function(err,rows){
        if(err){
            res.json({
                "codigo": 404,
                "status":"erro",
                "mensagem":"Erro"}
                )
        }else{res.json({
            "codigo": 200,
            "status":"Sucesso",
            "mensagem":"Requisição bem sucedida."}).send(row)}
    })
})
// Adiciona novo endereço
app.post("enderecos-usuario/:id_usuario/:logradouro/:numero/:cidade/:uf/:cep/:bairro", function(req,res){
    let iduser=parseInt(req.body.id_usuario);let lograd=req.body.logradouro;let nmr =req.body.numero;let cidade=req.body.cidade;let uf=req.body.uf;let cep=req.body.cep;let bairro=req.body.bairro
    conn.query('INSERT INTO enderecos_usuarios(id_usuarios, logradouro, numero,cidade,uf,cep,bairro) VALUES ((SELECT id_usuario from usuarios WHERE id_usuario=?),?,?,?,?,?,?);',[iduser],[lograd],[nmr],[cidade],[uf],[cep],[bairro],function(err,row){
        if(err){
            res.json({
                "codigo": 404,
                "status":"erro",
                "mensagem":"Erro"}
                )
        }else{res.json({
            "codigo": 200,
            "status":"Sucesso",
            "mensagem":"Requisição bem sucedida."}).send(row)}
    })
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