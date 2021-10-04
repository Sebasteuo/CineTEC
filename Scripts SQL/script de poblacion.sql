/*Insercion a rol*/
INSERT INTO public.rol(nombre) VALUES ('administrador');
INSERT INTO public.rol(nombre) VALUES ('proyeccionista');
INSERT INTO public.rol(nombre) VALUES ('cajero');

/*Insercion a empleado*/
INSERT INTO public.empleado(cedulaempleado,nombreempleado1,nombreempleado2,apellidoempleado1,apellidoempleado2,usuario,numerotelefono,fechaingreso,contrasenna,fechanacimiento) VALUES(12345678,'Huberto ','Gerardo','Mesen',' Gracia','hMesen',86750645,'20191109','t6fd6b4','19890504');
INSERT INTO public.empleado(cedulaempleado,nombreempleado1,nombreempleado2,apellidoempleado1,apellidoempleado2,usuario,numerotelefono,fechaingreso,contrasenna,fechanacimiento) VALUES(19715327,'Sara','Margarita','Arias ','Jiménez','sarias',89657210,'20210803','dt6ngf4','19950825');
INSERT INTO public.empleado(cedulaempleado,nombreempleado1,nombreempleado2,apellidoempleado1,apellidoempleado2,usuario,numerotelefono,fechaingreso,contrasenna,fechanacimiento) VALUES(51228674,'Ricandro ','Luis','Peralta','Noriega','rperalta',85421945,'20170105','b2rfgn6','19900102');

/*Insercion a rolxempleado*/
INSERT INTO public.rolxempleado(nombre,cedulaempleado) VALUES('administrador',12345678);
INSERT INTO public.rolxempleado(nombre,cedulaempleado) VALUES('proyeccionista',19715327);
INSERT INTO public.rolxempleado(nombre,cedulaempleado) VALUES('cajero',51228674);

/*Insercion a cliente*/
INSERT INTO public.cliente(cedulacliente,nombrecliente1,nombrecliente2,apellidocliente1,apellidocliente2,fechanacimiento,numerotelefono,cedulaempleado) VALUES(43908822,'Jose','Alexander','Bogantes','Jimenez','19591119',82564812,12345678);
INSERT INTO public.cliente(cedulacliente,nombrecliente1,nombrecliente2,apellidocliente1,apellidocliente2,fechanacimiento,numerotelefono,cedulaempleado) VALUES(57736901,'Fransisco','Alberto','Morales','Brenes','19671204',84168745,51228674);
INSERT INTO public.cliente(cedulacliente,nombrecliente1,nombrecliente2,apellidocliente1,apellidocliente2,fechanacimiento,numerotelefono,cedulaempleado) VALUES(36619762,'Ana','Cecilia','Pacheco','Chaves','19680112',84615479,51228674);
INSERT INTO public.cliente(cedulacliente,nombrecliente1,nombrecliente2,apellidocliente1,apellidocliente2,fechanacimiento,numerotelefono,cedulaempleado) VALUES(22136639,'Erica','Gabriela','Miranda','Gamboa','19941018',68418756,51228674);

/*Insercion a pelicula*/
INSERT INTO public.pelicula(peliid,nombreogpelicula,nombre,duracion,imagen,preciocidoro,precioninos,precioadulto,cedulaempleado) VALUES('ijh007','No Time to Die','Sin Tiempo para Morir',163,'g',2500,2500,3200,12345678);
INSERT INTO public.pelicula(peliid,nombreogpelicula,nombre,duracion,imagen,preciocidoro,precioninos,precioadulto,cedulaempleado) VALUES('mcu789','Shang-Chi y la leyenda de los Diez Anillos','Shang-Chi ',172,'g',2500,2500,3200,12345678);
INSERT INTO public.pelicula(peliid,nombreogpelicula,nombre,duracion,imagen,preciocidoro,precioninos,precioadulto,cedulaempleado) VALUES('xhd962','Coda: Señales del corazón','Coda: Señales del corazón',111,'g',2500,2500,3200,12345678);

/*Insercion a clasificacion*/
INSERT INTO public.clasificacion(peliid,descripcion ) VALUES('ijh007','M12');
INSERT INTO public.clasificacion(peliid,descripcion ) VALUES('mcu789','TPA');
INSERT INTO public.clasificacion(peliid,descripcion ) VALUES('xhd962','M12');


/*Insercion a director*/
INSERT INTO public.director(peliid,nombredirector) VALUES('ijh007','Cary Joji Fukunaga ');
INSERT INTO public.director(peliid,nombredirector) VALUES('xhd962','Sian Hede');
INSERT INTO public.director(peliid,nombredirector) VALUES('mcu789','Destin Daniel Cretton');

/*Insercion a protagonista*/
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('ijh007','Daniel Craig');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('ijh007','Naomie Harris');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('ijh007','Rami Malek');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('mcu789','Simu Liu');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('mcu789','Awkwafina');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('mcu789','Benedict Wong');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('mcu789','Michelle Yeo');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('xhd962','Eugenio Derbez');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('xhd962','Marlee Matli');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('xhd962','Emilia Jones');
INSERT INTO public.protaginista(peliid,nombreprotagonista) VALUES('xhd962','Daniel Duran');

/*Insercion a sala*/
INSERT INTO sala(salaid,columna,fila,capacidad) VALUES('4MN001',15,9,100);
INSERT INTO sala(salaid,columna,fila,capacidad) VALUES('3OR001',15,9,100);
INSERT INTO sala(salaid,columna,fila,capacidad) VALUES('1SA001',15,9,100);
INSERT INTO sala(salaid,columna,fila,capacidad) VALUES('2AL001',15,9,100);


/*Insercion a funcion*/
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('4MN001','ijh007','2021-10-24 17:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('3OR001','ijh007','2021-10-24 17:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('1SA001','ijh007','2021-10-24 17:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('2AL001','ijh007','2021-10-24 17:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('4MN001','mcu789','2021-10-24 13:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('3OR001','mcu789','2021-10-24 13:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('1SA001','mcu789','2021-10-24 13:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('2AL001','mcu789','2021-10-24 13:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('4MN001','xhd962','2021-10-24 11:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('3OR001','xhd962','2021-10-24 11:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('1SA001','xhd962','2021-10-24 11:20:00');
INSERT INTO public.funcion(salaid,peliid,hora) VALUES('2AL001','xhd962','2021-10-24 11:20:00');




