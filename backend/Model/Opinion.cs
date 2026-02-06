using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Opinion
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public int Rating { get; set; }

        [Required]
        public string UserId { get; set; }
        public AppUser User { get; set; }

        [Required]
        [MaxLength(1000)]
        public string UserOpinion { get; set; }

    }
}
