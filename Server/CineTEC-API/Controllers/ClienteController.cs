using CineTEC_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CineTEC_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ClienteController : ControllerBase
  {
    private string cadenaDeConexion = "PostgreSQLConnection"; //hace referencia a la cadena de conexion en appsettings.json
    private readonly IConfiguration _configuration;

    //el metodo constructor recibe como parametro una instancia de la interface Iconfiguration que permite la representacion de un conjunto de propiedades clave/valor
    public ClienteController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    //este metodo devuelve todas las tuplas en la tabla
    // GET: api/<EmpleadoController>
    [HttpGet]
    public JsonResult GetAll()
    {
      string query = @"
          select cedulacliente, nombrecliente1, nombrecliente2, apellidocliente1, apellidocliente2, fechanacimiento, numerotelefono
          from cliente
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myReader = myComand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult(table);
    }

    //este metodo recibe como parametro una llave primaria y devuelve la tupla donde está esa llave
    // GET api/<EmpleadoController>/5
    [HttpGet("{id}")]
    public JsonResult GetOne(int id)
    {
      string query = @"
          select cedulacliente, nombrecliente1, nombrecliente2, apellidocliente1, apellidocliente2, fechanacimiento, numerotelefono
          from cliente
          where cedulacliente = @cedulacliente
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulacliente", id);
          myReader = myComand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult(table);
    }

    //este metodo recibe como parametro un objeto con sus atributos para insertarlo como tupla en la tabla
    // POST api/<EmpleadoController>
    [HttpPost]
    public JsonResult Create(Cliente cliente)
    {
      string query = @"
          insert into cliente(cedulacliente, nombrecliente1, nombrecliente2, apellidocliente1, apellidocliente2, fechanacimiento, numerotelefono)
          values (@cedulacliente, @nombrecliente1, @nombrecliente2, @apellidocliente1, @apellidocliente2, @fechanacimiento, @numerotelefono)
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulacliente", cliente.cedulacliente);
          myComand.Parameters.AddWithValue("@nombrecliente1", cliente.nombrecliente1);
          myComand.Parameters.AddWithValue("@nombrecliente2", cliente.nombrecliente2);
          myComand.Parameters.AddWithValue("@apellidocliente1", cliente.apellidocliente1);
          myComand.Parameters.AddWithValue("@apellidocliente2", cliente.apellidocliente2);
          myComand.Parameters.AddWithValue("@fechanacimiento", cliente.fechanacimiento);
          myComand.Parameters.AddWithValue("@numerotelefono", cliente.numerotelefono);
          myReader = myComand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult("Added Successfully");
    }

    //este metodo recibe como parametro un objeto que tiene como llave primaria la misma llave que en una tupla existente para actualizar todos los atributos igual a los del objeto
    // PUT api/<EmpleadoController>/5
    [HttpPut]
    public JsonResult Update(Cliente cliente)
    {
      string query = @"
          update cliente
          set cedulacliente = @cedulacliente,
              nombrecliente1 = @nombrecliente1,
              nombrecliente2 = @nombrecliente2,
              apellidocliente1 = @apellidocliente1,
              apellidocliente2 = @apellidocliente2,
              fechanacimiento = @fechanacimiento,
              numerotelefono = @numerotelefono
          where cedulacliente = @cedulacliente
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulacliente", cliente.cedulacliente);
          myComand.Parameters.AddWithValue("@nombrecliente1", cliente.nombrecliente1);
          myComand.Parameters.AddWithValue("@nombrecliente2", cliente.nombrecliente2);
          myComand.Parameters.AddWithValue("@apellidocliente1", cliente.apellidocliente1);
          myComand.Parameters.AddWithValue("@apellidocliente2", cliente.apellidocliente2);
          myComand.Parameters.AddWithValue("@fechanacimiento", cliente.fechanacimiento);
          myComand.Parameters.AddWithValue("@numerotelefono", cliente.numerotelefono);
          myReader = myComand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult("Updated Successfully");
    }

    [HttpPut("[action]")]
    public JsonResult UpdateCredenciales(Cliente cliente)
    {
      string query = @"
          update cliente
          set usuario = @usuario,
              contrasenna = @contrasenna,
             
          where cedulacliente = @cedulacliente
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulacliente", cliente.cedulacliente);
          myComand.Parameters.AddWithValue("@usuario", cliente.usuario);
          myComand.Parameters.AddWithValue("@contrasenna", cliente.contrasenna);
         
          myReader = myComand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult("Updated Successfully");
    }

    //este metodo recibe como parametro una llave primaria y elimina la tupla con esa llave
    // DELETE api/<EmpleadoController>/5
    [HttpDelete("{id}")]
    public JsonResult Delete(int id)
    {
      string query = @"
          delete from cliente
          where cedulacliente = @cedulacliente
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulacliente", id);
          myReader = myComand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult("Deleted Successfully");
    }

    [HttpPost("[action]")]
    public JsonResult checkCredentials(Credenciales credenciales)
    {
      string query = @"
          select cedulacliente, nombrecliente1, nombrecliente2, apellidocliente1, apellidocliente2, fechanacimiento, numerotelefono
          from cliente
          where usuario = @usuario and contrasenna = @contrasenna
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@usuario", credenciales.user);
          myComand.Parameters.AddWithValue("@contrasenna", credenciales.password);
          myReader = myComand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult(table);
    }
  }
}

