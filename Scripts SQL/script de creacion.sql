CREATE TABLE FACTURAXCLIENTE (
	CedulaCliente INT NOT NULL,
	FACTURAID int	NOT NULL
);
CREATE TABLE FACTURA (
	Facturaid int generated always as identity	NOT NULL,
	Monto NUMERIC(10,2) NOT NULL,
	FuncionID VARCHAR(20) NOT NULL,
	NumeroDeAsiento INT NOT NULL,
	PRIMARY KEY (Facturaid)
);
CREATE TABLE ASIENTOXFACTURA (
	Facturaid int NOT NULL,
	NumeroDeAsiento INT NOT NULL
);

CREATE TABLE BUTACA(
	SalaID VARCHAR(10) NOT NULL,
	NumeroDeAsiento INT NOT NULL,
	CodigoSucursal VARCHAR(20) NOT NULL,
	PRIMARY KEY (NumeroDeAsiento)
);
CREATE TABLE SUCURSAL(
	CodigoSucursal VARCHAR(20) NOT NULL,
	Nombre VARCHAR(20) NOT NULL,
	Ubicacion VARCHAR(100) NOT NULL,
	CantidadSalas INT NOT NULL,
	PRIMARY KEY (CodigoSucursal)
);
CREATE TABLE PELICULAXSUCURSAL(
	CodigoSucursal VARCHAR(20) NOT NULL,
	PeliID VARCHAR(10) NOT NULL
);
CREATE TABLE FACTURAXEMPLEADO (
	CedulaEmpleado INT NOT NULL,
	Facturaid int	NOT NULL
);
CREATE TABLE CLIENTE (
	CedulaCliente INT NOT NULL,
	NombreCliente1 VARCHAR(50) NOT NULL,
	NombreCliente2 VARCHAR(50),
	ApellidoCliente1 VARCHAR(50) NOT NULL,
	ApellidoCliente2 VARCHAR(50) NOT NULL,
	FechaNacimiento DATE,
	NumeroTelefono INT,
	Usuario VARCHAR NOT NULL,
	Contrasenna VARCHAR(50) NOT NULL,
	PRIMARY KEY (CedulaCliente)
);
CREATE TABLE EMPLEADO (
	CedulaEmpleado INT NOT NULL,
	NombreEmpleado1 VARCHAR(50) NOT NULL,
	NombreEmpleado2 VARCHAR(50),
	ApellidoEmpleado1 VARCHAR(50) NOT NULL,
	ApellidoEmpleado2 VARCHAR(50) NOT NULL,
	FechaNacimiento DATE,
	Usuario VARCHAR NOT NULL,
	NumeroTelefono INT NOT NULL,
	FechaIngreso  TIMESTAMP,
	Contrasenna VARCHAR(50) NOT NULL,
	CodigoSucursal VARCHAR(20) NOT NULL,
	PRIMARY KEY (CedulaEmpleado)
);

CREATE TABLE PELICULA (
	PeliID VARCHAR(10) NOT NULL,
	NombreOgPelicula VARCHAR(50) NOT NULL,
	Nombre VARCHAR(50) NOT NULL,
	Duracion INT NOT NULL,
	Imagen VARCHAR(50),
	PrecioCidOro INT NOT NULL,
	PrecioNinos INT ,
	PrecioAdulto INT NOT NULL,
	CedulaEmpleado INT,
	PRIMARY KEY (PeliID)
);
CREATE TABLE SALA (
	SalaID VARCHAR(10) NOT NULL,
	Columna INT NOT NULL,
	Fila INT NOT NULL,
	Capacidad INT NOT NULL,
	CodigoSucursal VARCHAR(20) NOT NULL,
	PRIMARY KEY (SalaID)
);
CREATE TABLE FUNCION (
	SalaID VARCHAR(10) NOT NULL,
	Hora TIMESTAMP NOT NULL,
	PeliID VARCHAR(10) NOT NULL,
	FuncionID VARCHAR(20) NOT NULL,
	PRIMARY KEY (FuncionID)
);
CREATE TABLE BUTACAXFUNCION (
	NumeroDeAsiento INT NOT NULL,
	FuncionID VARCHAR(20) NOT NULL

);
CREATE TABLE CLASIFICACION (
	PeliID VARCHAR(10) NOT NULL,
	Descripcion TEXT
);
CREATE TABLE DIRECTOR (
	PeliID VARCHAR(10) NOT NULL,
	NombreDirector VARCHAR(80)
);
CREATE TABLE PROTAGONISTA (
	PeliID VARCHAR(10) NOT NULL,
	NombreProtagonista VARCHAR(80)
);
CREATE TABLE ROLXEMPLEADO (
	Nombre VARCHAR(75) NOT NULL,
	CedulaEmpleado INT
);
CREATE TABLE ROL (
	Nombre VARCHAR(75) NOT NULL,
	PRIMARY KEY (Nombre)
);
/** LLAVES FORANEAS CON RESPECTO A EMPLEADO **/
ALTER TABLE FACTURAXEMPLEADO
ADD CONSTRAINT FACTURAXEMPLEADO_EMPLEADO_FK FOREIGN KEY (CedulaEmpleado)
REFERENCES EMPLEADO(CedulaEmpleado);

ALTER TABLE ROLXEMPLEADO
ADD CONSTRAINT ROLXEMPLEADO_EMPLEADO_FK FOREIGN KEY (CedulaEmpleado)
REFERENCES EMPLEADO(CedulaEmpleado);

ALTER TABLE PELICULA
ADD CONSTRAINT PELICULA_EMPLEADO_FK FOREIGN KEY (CedulaEmpleado)
REFERENCES EMPLEADO(CedulaEmpleado);

/** LLAVES FORANEAS CON RESPECTO A PELICULA **/
ALTER TABLE CLASIFICACION
ADD CONSTRAINT CLASIFICACION_PELICULA_FK FOREIGN KEY (PeliID)
REFERENCES PELICULA(PeliID);

ALTER TABLE DIRECTOR
ADD CONSTRAINT DIRECTOR_PELICULA_FK FOREIGN KEY (PeliID)
REFERENCES PELICULA(PeliID);

ALTER TABLE PROTAGONISTA
ADD CONSTRAINT PROTAGONISTA_PELICULA_FK FOREIGN KEY (PeliID)
REFERENCES PELICULA(PeliID);

ALTER TABLE FUNCION
ADD CONSTRAINT FUNCION_PELICULA_FK FOREIGN KEY (PeliID)
REFERENCES PELICULA(PeliID);

ALTER TABLE PELICULAXSUCURSAL
ADD CONSTRAINT PELICULAXSUCURSAL_PELICULA_FK FOREIGN KEY (PeliID)
REFERENCES PELICULA(PeliID);

/** LLAVES FORANEAS CON RESPECTO A SALA **/

ALTER TABLE FUNCION
ADD CONSTRAINT FUNCION_SALA_FK FOREIGN KEY (SalaID)
REFERENCES SALA(SalaID);

ALTER TABLE BUTACA
ADD CONSTRAINT BUTACA_SALA_FK FOREIGN KEY (SalaID)
REFERENCES SALA(SalaID);

/** LLAVES FORANEAS CON RESPECTO A ROL**/
ALTER TABLE ROLXEMPLEADO
ADD CONSTRAINT ROLXEMPLEADO_ROL_FK FOREIGN KEY (Nombre)
REFERENCES ROL(Nombre);

/** LLAVES FORANEAS CON RESPECTO A FUNCION**/

ALTER TABLE FACTURA
ADD CONSTRAINT FACTURA_FUNCION_FK FOREIGN KEY (FuncionID)
REFERENCES FUNCION(FuncionID);

ALTER TABLE BUTACAXFUNCION
ADD CONSTRAINT BUTACAXFUNCION_FUNCION_FK FOREIGN KEY (FuncionID)
REFERENCES FUNCION(FuncionID);

/** LLAVES FORANEAS CON RESPECTO A FACTURA**/

ALTER TABLE FACTURAXCLIENTE
ADD CONSTRAINT FACTURAXCLIENTE_FUNCION_FK FOREIGN KEY (Facturaid)
REFERENCES FACTURA(Facturaid);

ALTER TABLE FACTURAXEMPLEADO
ADD CONSTRAINT FACTURAXEMPLEADO_FUNCION_FK FOREIGN KEY (Facturaid)
REFERENCES FACTURA(Facturaid);

ALTER TABLE ASIENTOXFACTURA
ADD CONSTRAINT ASIENTOXFACTURA_FUNCION_FK FOREIGN KEY (Facturaid)
REFERENCES FACTURA(Facturaid);


/** LLAVES FORANEAS CON RESPECTO A SUCURSAL**/
ALTER TABLE BUTACA
ADD CONSTRAINT BUTACA_SUCURSAL_FK FOREIGN KEY (CodigoSucursal)
REFERENCES SUCURSAL(CodigoSucursal);

ALTER TABLE PELICULAXSUCURSAL
ADD CONSTRAINT PELICULAXSUCURSAL_SUCURSAL_FK FOREIGN KEY (CodigoSucursal)
REFERENCES SUCURSAL(CodigoSucursal);

ALTER TABLE EMPLEADO
ADD CONSTRAINT EMPLEADO_SUCURSAL_FK FOREIGN KEY (CodigoSucursal)
REFERENCES SUCURSAL(CodigoSucursal);

ALTER TABLE SALA
ADD CONSTRAINT SALA_SUCURSAL_FK FOREIGN KEY (CodigoSucursal)
REFERENCES SUCURSAL(CodigoSucursal);

/** LLAVES FORANEAS CON RESPECTO A CLIENTE**/
ALTER TABLE FACTURAXCLIENTE
ADD CONSTRAINT FACTURAXCLIENTE_EMPLEADO_FK FOREIGN KEY (CedulaCliente)
REFERENCES CLIENTE(CedulaCliente);

