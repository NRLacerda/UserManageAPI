var mysql = require('mysql2')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'stenngdb'
  });

connection.connect((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database connected')
  })
module.exports = connection

/*
Tabelas:

  CREATE TABLE usuarios( 
    id_usuario int primary key AUTO_INCREMENT,
    nome varchar(255),
    sobrenome varchar(255),
    email varchar (255),
    telefone varchar (45),
    cpf varchar (45)
);
CREATE TABLE enderecos_usuarios( 
    id_endereco_usuario int primary key AUTO_INCREMENT,
    id_usuario FOREIGN KEY REFERENCES usuarios(id_usuario), 
    logradouro varchar(255),
    numero varchar(45),
    cidade varchar (255),
    uf varchar (2),
    cep varchar (45),
    bairro varchar (255),
    complemento
);

*/