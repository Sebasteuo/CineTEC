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
  public class FacturaXClienteController : ControllerBase
  {
    private string cadenaDeConexion = "PostgreSQLConnection"; //hace referencia a la cadena de conexion en appsettings.json
    private readonly IConfiguration _configuration;

    //el metodo constructor recibe como parametro una instancia de la interface Iconfiguration que permite la representacion de un conjunto de propiedades clave/valor
    public FacturaXClienteController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    //este metodo devuelve todas las tuplas en la tabla
    // GET: api/<EmpleadoController>
    [HttpGet]
    public JsonResult GetAll()
    {
      string query = @"
          select cedulacliente, facturaid
          from facturaxcliente
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
    public JsonResult GetOne(string id)
    {
      string query = @"
          select cedulacliente, facturaid
          from facturaxcliente
          where facturaid = @facturaid
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@facturaid", id);
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
    public JsonResult Create(FacturaXCliente facturaxcliente)
    {
      string query = @"
          insert into facturaxcliente(cedulacliente, facturaid)
          values (@cedulacliente, @facturaid)
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulacliente", facturaxcliente.cedulacliente);
          myComand.Parameters.AddWithValue("@facturaid", facturaxcliente.facturaid);
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
    public JsonResult Update(FacturaXCliente facturaxcliente)
    {
      string query = @"
          update facturaxcliente
          set cedulacliente = @cedulacliente,
              facturaid = @facturaid
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulacliente", facturaxcliente.cedulacliente);
          myComand.Parameters.AddWithValue("@facturaid", facturaxcliente.facturaid);
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
    public JsonResult Delete(string id)
    {
      string query = @"
          delete from facturaxcliente
          where facturaid = @facturaid
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@facturaid", id);
          myReader = myComand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult("Deleted Successfully");
    }
  }
}
