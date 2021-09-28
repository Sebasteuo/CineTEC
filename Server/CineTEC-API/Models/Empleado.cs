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
    public int eid { get; set; }
    public string nombre { get; set; }
  }
}
