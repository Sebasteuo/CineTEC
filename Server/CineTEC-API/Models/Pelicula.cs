using System.ComponentModel.DataAnnotations;

namespace CineTEC_API.Models
{
  public class Pelicula
  {
    //indica que la llave primaria es peliid
    [Key]
    public string peliid { get; set; }
    public string nombreogpelicula { get; set; }
    public string nombre { get; set; }
    public int duracion { get; set; }
    public string imagen { get; set; }
    public int preciocidoro { get; set; }
    public int precioninos { get; set; }
    public int precioadulto { get; set; }
    public int cedulaempleado { get; set; }
    public string codigosucursal { get; set; }
  }
}
