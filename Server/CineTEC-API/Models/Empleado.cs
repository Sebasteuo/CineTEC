using System;
using System.ComponentModel.DataAnnotations;

namespace CineTEC_API.Models
{
  public class Empleado
  {
    //indica que la llave primaria es cedulaempleado
    [Key]
    public int cedulaempleado { get; set; }
    public string nombreempleado1 { get; set; }
    public string nombreempleado2 { get; set; }
    public string apellidoempleado1 { get; set; }
    public string apellidoempleado2 { get; set; }
    public string usuario { get; set; }
    public int numerotelefono { get; set; }
    public float edad { get; set; }
    public DateTime fechaingreso { get; set; }
    public string contrasenna { get; set; }
  }
}
