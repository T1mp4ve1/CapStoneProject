using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Ticket
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public TicketState State { get; set; }

        [Required]
        public string UserId { get; set; }
        public AppUser User { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Problem { get; set; }
    }
}