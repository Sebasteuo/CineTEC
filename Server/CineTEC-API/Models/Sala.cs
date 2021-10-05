using System.ComponentModel.DataAnnotations;

namespace CineTEC_API.Models
{
  public class Sala
  {
    //indica que la llave primaria es salaid
    [Key]
    public string salaid { get; set; }
    public int columna { get; set; }
    public int fila { get; set; }
    public int capacidad { get; set; }
  }
}
