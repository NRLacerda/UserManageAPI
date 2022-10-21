var mysql = require('mysql2')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'@n1Mseguranza',
    database: 'stenngdb'
  });

conn.connect((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database connected')
  })
module.exports = conn

/*
Tabelas:
    -----------
    CREATE TABLE usuarios( 
    id_usuario int primary key AUTO_INCREMENT,
    nome varchar(255) NOT NULL,
    sobrenome varchar(255) NOT NULL,
    email varchar (255) NOT NULL,
    telefone varchar (45) NOT NULL,
    cpf varchar (45) NOT NULL
);
    -----------
    CREATE TABLE enderecos_usuarios( 
    id_endereco_usuario int primary key AUTO_INCREMENT,
    id_usuarios int not null,
    foreign key (id_usuarios) references usuarios(id_usuario),
    logradouro varchar(255) not null,
    numero varchar(45) not null,
    cidade varchar (255) not null,
    uf varchar (2) not null,
    cep varchar (45) not null,
    bairro varchar (255) not null,
    complemento varchar (255) not null
    );
    -----------
    ALTER TABLE enderecos_usuarios
    ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuarios)
    -----------
    
    INSERT INTO usuarios (nome, sobrenome, email, telefone, cpf)
    VALUES ('nic', 'roc', '123@123.com', '12345', '1234567689');

    INSERT INTO enderecos_usuarios (id_usuario,logradouro, numero, cidade, uf, cep, bairro, complemento) 
    VALUES ('21','lograd','124','abc','abcd','SP','1234577','11');
*/