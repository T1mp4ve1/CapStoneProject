using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Guitar
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public GuitarCategory Category { get; set; }
    }
}