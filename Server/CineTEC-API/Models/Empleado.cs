using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CineTEC_API.Models
{
  public class Empleado
  {
    //[Table("Empleado",Schema ="public")]
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
