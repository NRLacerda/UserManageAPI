/*
DB DRIVER
To test whether a row exists in a MySQL table or not, use exists condition. 
The exists condition can be used with subquery. 
It returns true when row exists in the table, otherwise false is returned. 
True is represented in the form of 1 and false is represented as 0.
*/

const express = require("express");
const app = express();

// Envia statuscode
app.get('/', function (req, res) {
    res.status(200).send('Codigo:200\nStatus:Sucesso! \n Mensagem:Acao realizada com sucesso!')  
});
app.get('/', function (req, res) {
    res.status(404).send('Codigo:400\nStatus:Erro! \n Mensagem:Acao nao realizada com sucesso!')  
});

app.listen(80, function () {
	console.log("server running!");
});