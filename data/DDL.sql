# DATA DEFINITION LANGUAGE

drop database safetrack;

create database safetrack;
use safetrack;

create table tb_usuario
(id int primary key auto_increment,
 usuario varchar (255),
 senha varchar(255)
);

create table relatar
(id_relatardesastre int primary key auto_increment,
relatar_desastre varchar(255),
nivel_perigo int,
cidade_ocorrido varchar (255)
);

create table local
(id_locate int primary key auto_increment,
 nome_local varchar (255),
 endereco varchar (255),
 funcionamento varchar (255),
 status varchar (20) default 'pendente',
 imagem text
);

