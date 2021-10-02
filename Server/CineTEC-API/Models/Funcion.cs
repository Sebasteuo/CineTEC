using System;
using System.ComponentModel.DataAnnotations;

namespace CineTEC_API.Models
{
  public class Funcion
  {
    public string salaid { get; set; }
    public TimeSpan hora { get; set; }
    public string peliid { get; set; }
  }
}
