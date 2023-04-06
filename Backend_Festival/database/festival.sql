CREATE DATABASE festival;

USE festival;

-- TABLE USER
-- all pasword wil be encrypted using SHA1

CREATE TABLE usuarios(
idUsuario INTEGER PRIMARY KEY auto_increment ,
primerNombre VARCHAR(200) NOT NULL,
primerApellido VARCHAR(200) NOT NULL,
nombreUsuario VARCHAR(200) NOT NULL,
fechaNacimiento DATE NOT NULL,
correoElectronico VARCHAR(200) UNIQUE NOT NULL,
telefono VARCHAR(8) UNIQUE NOT NULL,
sexo VARCHAR(10) NOT NULL,
password VARCHAR(200) NOT NULL,
CONSTRAINT ck_primerNombre CHECK (primerNombre NOT LIKE '%[^A-Z]%'),
CONSTRAINT ck_primerApellido CHECK (primerApellido NOT LIKE '%[^A-Z]%'),
CONSTRAINT ck_correo CHECK(correoELectronico LIKE '_%@__%.__%'),    
CONSTRAINT ck_telefono CHECK (telefono NOT LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
CONSTRAINT ck_sexo CHECK(sexo = 'Masculino' OR sexo = 'Femenino' )
);

CREATE TABLE administrador(
idAdmin INTEGER PRIMARY KEY AUTO_INCREMENT ,
idUsuario INTEGER NOT NULL,
FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) 
);

CREATE TABLE cliente(
idCliente INTEGER PRIMARY KEY AUTO_INCREMENT ,
idUsuario INTEGER NOT NULL,
FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) 
);


CREATE TABLE tipoMaquina(
idTipoMaquina INTEGER PRIMARY KEY auto_increment, 
tipoMaquina VARCHAR (300) NOT NULL,
Descripcion VARCHAR (300) NOT NULL
);

CREATE TABLE marca(
idMarca INTEGER PRIMARY KEY auto_increment, 
marca VARCHAR (300) NOT NULL,
Descripcion VARCHAR (300) NOT NULL,
Pais VARCHAR (100) NOT NULL

);


CREATE TABLE maquina(
idMaquina INTEGER PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (100) NOT NULL, 
descripcion VARCHAR (300) NOT NULL,
precio INTEGER NOT NULL,
existencia INTEGER NOT NULL,
image_1 VARCHAR (300) NOT NULL,
image_2 VARCHAR (300) NOT NULL,
image_3 VARCHAR (300) NOT NULL,
TipoMaquina VARCHAR (100) NOT NULL,
marca VARCHAR (100) NOT NULL,
pais VARCHAR (100) NOT NULL,
CONSTRAINT ck_nombre CHECK (nombre NOT LIKE '%[^A-Z]%')
);



CREATE TABLE repuestos(
idRepuesto INTEGER PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (100) NOT NULL, 
descripcion VARCHAR (300) NOT NULL,
precio INTEGER NOT NULL,
existencia INTEGER NOT NULL,
image_1 VARCHAR (300) NOT NULL,
image_2 VARCHAR (300) NOT NULL,
image_3 VARCHAR (300) NOT NULL,
idMaquina INTEGER NOT NULL,
CONSTRAINT ck_nombre CHECK (nombre NOT LIKE '%[^A-Z]%'),
FOREIGN KEY (idMaquina) REFERENCES maquina(idMaquina)
);


#CREATE TABLE Compra(
#idCompra INTEGER PRIMARY KEY AUTO_INCREMENT,
#cantidadPersonas INTEGER NOT NULL,
#precioPorNoche INTEGER NOT NULL,
#cantidadNoches INTEGER NOT NULL,
#subTotal DECIMAL (13,2) NOT NULL,
#impuesto DECIMAL (13,2) NOT NULL,
#total DECIMAL (13,2) NOT NULL,
#fecha DATE NOT NULL,
#idUsuario INTEGER NOT NULL,
#idPropiedad INTEGER NOT NULL,
#FOREIGN KEY (idUsuario) REFERENCES usuarios (idUsuario),
#FOREIGN KEY (idPropiedad) REFERENCES Propiedad(idPropiedad)
#);
