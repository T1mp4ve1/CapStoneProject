using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Image
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public ImageTypes EntityType { get; set; }

        public string? EntityId { get; set; }

        [Required]
        public bool IsMain { get; set; }
    }
}
