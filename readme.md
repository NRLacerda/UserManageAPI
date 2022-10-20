STENNG DB
1- Para utilizar a aplicação, tenha em sua máquina o MySQL com as seguintes configurações>
user: 'root',
password:'@n1Mseguranza',
database: 'stenngdb'
Após instalação e configuração, crie as seguinte tabelas no MySQL>

    1.1- Tabela de usuários.

        CREATE TABLE usuarios(
        id_usuario int primary key AUTO_INCREMENT,
        nome varchar(255) NOT NULL,
        sobrenome varchar(255) NOT NULL,
        email varchar (255) NOT NULL,
        telefone varchar (45) NOT NULL,
        cpf varchar (45) NOT NULL
        );

    1.2- Tabela de endereços.

        CREATE TABLE enderecos_usuarios( 
        id_endereco_usuario int primary key AUTO_INCREMENT,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        logradouro varchar(255) NOT NULL,
        numero varchar(45) NOT NULL,
        cidade varchar (255) NOT NULL,
        uf varchar (2) NOT NULL,
        cep varchar (45) NOT NULL,
        bairro varchar (255) NOT NULL,
        complemento varchar 
);

2- Na pasta raiz do app, execute o comando "npm install" para instalar os pacotes.
3- Após isso execute o comando "node index.js" para executar a aplicação, que deve estar disponível e printar no console "Server running! Database connected" e estar disponível em "localhost:4242"