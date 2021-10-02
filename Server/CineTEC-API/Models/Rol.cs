using System.ComponentModel.DataAnnotations;

namespace CineTEC_API.Models
{
  public class Rol
  {
    //indica que la llave primaria es cedulaempleado
    [Key]
    public string nombre { get; set; }
  }
}
