USE festival;
$$
CREATE TABLE `BITACORAS` (
	`IdBitacora` INT(11) NOT NULL,
	`Tabla` VARCHAR(200) NULL DEFAULT NULL ,
	`Descripcion` VARCHAR(2000) NULL DEFAULT NULL ,
	`Fecha_Hora` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`Usuario` VARCHAR(100) NULL DEFAULT NULL ,
	`Operacion` VARCHAR(50) NULL DEFAULT NULL ,
	PRIMARY KEY (`IdBitacora`) USING BTREE
);

DELIMITER $$

CREATE TRIGGER tg_nuevo_usuario AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO BITACORAS (Tabla, Descripcion, Fecha_Hora, Usuario, Operacion) 
	VALUES ('usuarios','Nuevo usuario agregado', NOW(), new.idUsuario, 'INSERT');
END$$


CREATE TRIGGER tg_nueva_maquina AFTER INSERT ON maquina
FOR EACH ROW
BEGIN
  INSERT INTO BITACORAS (Tabla, Descripcion, Fecha_Hora, Usuario, Operacion) 
	VALUES ('maquina','Nuevo maquina agregada', NOW(), 'ADMIN', 'INSERT');
END$$


CREATE TRIGGER tg_nuevo_repuesto AFTER INSERT ON maquina
FOR EACH ROW
BEGIN
  INSERT INTO BITACORAS (Tabla, Descripcion, Fecha_Hora, Usuario, Operacion) 
	VALUES ('maquina','Nuevo repuesto agregado', NOW(), 'ADMIN', 'INSERT');
END$$


CREATE TRIGGER tg_nuevo_plan AFTER INSERT ON planes
FOR EACH ROW
BEGIN
    INSERT INTO BITACORAS (Tabla, Descripcion, Fecha_Hora, Usuario, Operacion) 
    VALUES ('planes','Nueva suscripción a plan', new.idUsuario, , 'INSERT');
END$$


DROP TRIGGER IF EXISTS tg_updated_plan$$
CREATE TRIGGER tg_updated_plan AFTER UPDATE ON DrawingConfig 
FOR EACH ROW
BEGIN
    INSERT INTO BITACORAS (Tabla, Descripcion, Fecha_Hora, Usuario, Operacion)
    VALUES('planes','actualización de plan', new.idUsuario, , 'INSERT');
END$$

DELIMITER ;

