using System;
using System.ComponentModel.DataAnnotations;
namespace CineTEC_API.Models
{
  public class Cliente
  {
    //indica que la llave primaria es cedulacliente
    [Key]
    public int cedulacliente { get; set; }
    public string nombrecliente1 { get; set; }
    public string nombrecliente2 { get; set; }
    public string apellidocliente1 { get; set; }
    public string apellidocliente2 { get; set; }
    public DateTime fechanacimiento { get; set; }
    public int numerotelefono { get; set; }
    public int cedulaempleado { get; set; }
  }
}
