using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CineTEC_API.Models
{
  public class Sucursal
  {
    [Key]
    public string codigosucursal { get; set; }
    public string nombre { get; set; }
    public string ubicacion { get; set; }
    public int cantidadsalas { get; set; }
  }
}
