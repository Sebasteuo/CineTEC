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
    private string cadenaDeConexion = "PostgreSQLConnection";
    private readonly IConfiguration _configuration;

    public EmpleadoController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    // GET: api/<EmpleadoController>
    [HttpGet]
    public JsonResult GetAll()
    {
      string query = @"
          select cedulaempleado, nombreempleado1, nombreempleado2, apellidoempleado1, apellidoempleado2, usuario, numerotelefono, edad, fechaingreso, contrasenna
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

    // GET api/<EmpleadoController>/5
    [HttpGet("{id}")]
    public JsonResult GetOne(int id)
    {
      string query = @"
          select cedulaempleado, nombreempleado1, nombreempleado2, apellidoempleado1, apellidoempleado2, usuario, numerotelefono, edad, fechaingreso, contrasenna
          from empleado
          where cedulaempleado = @eid
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString(cadenaDeConexion);
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@eid", id);
          myReader = myComand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult(table);
    }

    // POST api/<EmpleadoController>
    [HttpPost]
    public JsonResult Create(Empleado empleado)
    {
      string query = @"
          insert into empleado(cedulaempleado, nombreempleado1, nombreempleado2, apellidoempleado1, apellidoempleado2, usuario, numerotelefono, edad, fechaingreso, contrasenna)
          values (@cedulaempleado, @nombreempleado1, @nombreempleado2, @apellidoempleado1, @apellidoempleado2, @usuario, @numerotelefono, @edad, @fechaingreso, @contrasenna)
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
          myComand.Parameters.AddWithValue("@usuario", empleado.usuario);
          myComand.Parameters.AddWithValue("@numerotelefono", empleado.numerotelefono);
          myComand.Parameters.AddWithValue("@edad", empleado.edad);
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
              usuario = @usuario,
              numerotelefono = @numerotelefono,
              edad = @edad,
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
          myComand.Parameters.AddWithValue("@usuario", empleado.usuario);
          myComand.Parameters.AddWithValue("@numerotelefono", empleado.numerotelefono);
          myComand.Parameters.AddWithValue("@edad", empleado.edad);
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
