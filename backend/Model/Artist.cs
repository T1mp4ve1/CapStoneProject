using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Artist
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        public string Img { get; set; }

        [Required]
        [MaxLength(1000)]
        public string About { get; set; }
    }
}
