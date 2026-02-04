using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Notification
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }
        public AppUser User { get; set; }

        [Required]
        public Guid OrderId { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public bool Read { get; set; }
    }
}
