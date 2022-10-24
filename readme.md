<h1>STENNG - BACKEND PROVA</h1>
<h3>Por Nicolas Rocha Lacerda</h3>

1- Para utilizar a aplicação, tenha em sua máquina o MySQL com as seguintes configurações><br>
user: 'root',<br>
password:'@n1Mseguranza',<br>
database: 'stenngdb'<br>
Após instalação e configuração, crie as seguinte tabelas no MySQL><br>

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
        id_usuarios int not null,
        foreign key (id_usuarios) references usuarios(id_usuario),
        logradouro varchar(255)not null,
        numero varchar(45)not null,
        cidade varchar (255)not null,
        uf varchar (2)not null,
        cep varchar (45) not null,
        bairro varchar (255) not null,
        complemento varchar (255) 
        );
    1.3- Popule as tabelas com alguns dados para teste, da seguinte forma e 
    preencha os "VALUES" conforme preferir.
        Ex:
        INSERT INTO usuarios (nome, sobrenome, email, telefone, cpf)
        VALUES ('algum nome', 'sobrenome exemplo', '123@123.com', '12345', '1234567689');

    1.4- Faça o mesmo com a tabela enderecos_usuarios
        Ex:
        INSERT INTO enderecos_usuarios(id_usuarios, logradouro, numero,cidade,uf,cep,bairro,complemento) VALUES
        (SELECT id_usuario from usuarios WHERE id_usuario=8),'rua nelson', '123' ,'sbc','sp','09812020','doscasa','abc');

2- Na pasta raiz do app, execute o comando "npm install" para instalar os pacotes.

3- Após isso execute o comando "nodemon index.js" para executar a aplicação, que deve estar disponível e printar no console "Server running! Database connected" e estar disponível em "localhost:4242"

Adicional: Fiz deploy da API numa VM na DigitalOcean, pode ser chamada através de http://68.183.98.208:4242/a-rota-aqui
