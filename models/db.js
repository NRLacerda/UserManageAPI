var mysql = require('mysql2')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'@n1Mseguranza',
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
    nome varchar(255) NOT NULL,
    sobrenome varchar(255) NOT NULL,
    email varchar (255) NOT NULL,
    telefone varchar (45) NOT NULL,
    cpf varchar (45) NOT NULL
);
CREATE TABLE enderecos_usuarios( 
    id_endereco_usuario int primary key AUTO_INCREMENT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    logradouro varchar(255) NOT NULL,
    numero varchar(45) NOT NULL,
    cidade varchar (255) NOT NULL,
    uf varchar (2) NOT NULL,
    cep varchar (45) NOT NULL,
    bairro varchar (255) NOT NULL,
    complemento varchar (45)
);
    -----------
    ALTER TABLE enderecos_usuarios
    ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuarios)
    -----------
    
    INSERT INTO usuarios (nome, sobrenome, email, telefone, cpf)
    VALUES ('nic', 'roc', '123@123.com', '12345', '1234567689');
*/