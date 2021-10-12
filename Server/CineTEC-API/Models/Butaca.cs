using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CineTEC_API.Models
{
  public class Butaca
  {
    [Key]
    public int numerodeasiento { get; set; }
    public string salaid { get; set; }
    public string codigosucursal { get; set; }
  }
}
