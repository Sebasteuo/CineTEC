using CineTEC_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
using System.Threading.Tasks;


namespace CineTEC_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmpleadoController : ControllerBase
  {
    private string cadenaDeConexion = "PostgreSQLConnection"; //hace referencia a la cadena de conexion en appsettings.json
    private readonly IConfiguration _configuration;

    //el metodo constructor recibe como parametro una instancia de la interface Iconfiguration que permite la representacion de un conjunto de propiedades clave/valor
    public EmpleadoController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    //este metodo devuelve todas las tuplas en la tabla
    // GET: api/<EmpleadoController>
    [HttpGet]
    public JsonResult GetAll()
    {
      string query = @"
          select cedulaempleado, nombreempleado1, nombreempleado2, apellidoempleado1, apellidoempleado2, fechanacimiento, usuario, numerotelefono, fechaingreso, contrasenna
          from empleado
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon=new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using(NpgsqlCommand myComand=new NpgsqlCommand(query, myCon))
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
          select cedulaempleado, nombreempleado1, nombreempleado2, apellidoempleado1, apellidoempleado2, fechanacimiento, usuario, numerotelefono, fechaingreso, contrasenna
          from empleado
          where cedulaempleado = @cedulaempleado
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulaempleado", id);
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
    public JsonResult Create(Empleado empleado)
    {
      string query = @"
          insert into empleado(cedulaempleado, nombreempleado1, nombreempleado2, apellidoempleado1, apellidoempleado2, fechanacimiento, usuario, numerotelefono, fechaingreso, contrasenna)
          values (@cedulaempleado, @nombreempleado1, @nombreempleado2, @apellidoempleado1, @apellidoempleado2, @fechanacimiento, @usuario, @numerotelefono, @fechaingreso, @contrasenna)
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulaempleado", empleado.cedulaempleado);
          myComand.Parameters.AddWithValue("@nombreempleado1",empleado.nombreempleado1);
          myComand.Parameters.AddWithValue("@nombreempleado2", empleado.nombreempleado2);
          myComand.Parameters.AddWithValue("@apellidoempleado1", empleado.apellidoempleado1);
          myComand.Parameters.AddWithValue("@apellidoempleado2", empleado.apellidoempleado2);
          myComand.Parameters.AddWithValue("@fechanacimiento", empleado.fechanacimiento);
          myComand.Parameters.AddWithValue("@usuario", empleado.usuario);
          myComand.Parameters.AddWithValue("@numerotelefono", empleado.numerotelefono);
          myComand.Parameters.AddWithValue("@fechaingreso", empleado.fechaingreso);
          myComand.Parameters.AddWithValue("@contrasenna", empleado.contrasenna);
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
    public JsonResult Update(Empleado empleado)
    {
      string query = @"
          update empleado
          set cedulaempleado = @cedulaempleado,
              nombreempleado1 = @nombreempleado1,
              nombreempleado2 = @nombreempleado2,
              apellidoempleado1 = @apellidoempleado1,
              apellidoempleado2 = @apellidoempleado2,
              fechanacimiento = @fechanacimiento,
              usuario = @usuario,
              numerotelefono = @numerotelefono,
              fechaingreso = @fechaingreso,
              contrasenna = @contrasenna
          where cedulaempleado = @cedulaempleado
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulaempleado", empleado.cedulaempleado);
          myComand.Parameters.AddWithValue("@nombreempleado1", empleado.nombreempleado1);
          myComand.Parameters.AddWithValue("@nombreempleado2", empleado.nombreempleado2);
          myComand.Parameters.AddWithValue("@apellidoempleado1", empleado.apellidoempleado1);
          myComand.Parameters.AddWithValue("@apellidoempleado2", empleado.apellidoempleado2);
          myComand.Parameters.AddWithValue("@fechanacimiento", empleado.fechanacimiento);
          myComand.Parameters.AddWithValue("@usuario", empleado.usuario);
          myComand.Parameters.AddWithValue("@numerotelefono", empleado.numerotelefono);
          myComand.Parameters.AddWithValue("@fechaingreso", empleado.fechaingreso);
          myComand.Parameters.AddWithValue("@contrasenna", empleado.contrasenna);
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
          delete from empleado
          where cedulaempleado = @cedulaempleado
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@cedulaempleado", id);
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
