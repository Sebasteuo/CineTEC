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
          select cedulaempleado, nombreempleado1
          from empleado
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("PostgreSQLConnection");
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
          select cedulaempleado, nombre
          from empleado
          where cedulaempleado = @eid
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("PostgreSQLConnection");
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
          insert into empleado(nombre)
          values (@nombre)
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("PostgreSQLConnection");
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@nombre",empleado.nombre);
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
          set nombre = @nombre
          where eid = @eid
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("PostgreSQLConnection");
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myComand = new NpgsqlCommand(query, myCon))
        {
          myComand.Parameters.AddWithValue("@eid", empleado.eid);
          myComand.Parameters.AddWithValue("@nombre", empleado.nombre);
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
          where eid = @eid
          ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("PostgreSQLConnection");
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
      return new JsonResult("Deleted Successfully");
    }
  }
}
