using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CineTEC_API.Models
{
  public class Factura
  {
    [Key]
    public int facturaid { get; set; }
    public float monto { get; set; }
    public string funcionid {get; set;}
    public int numerodeasiento { get; set; }
  }
}
