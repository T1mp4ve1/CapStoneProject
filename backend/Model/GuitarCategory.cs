using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class GuitarCategory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CategoryName { get; set; }
    }
}