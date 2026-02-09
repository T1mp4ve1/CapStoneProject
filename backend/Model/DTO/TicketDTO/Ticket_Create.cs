using System.ComponentModel.DataAnnotations;

namespace backend.Model.DTO.TicketDTO
{
    public class Ticket_Create
    {
        [Required]
        [MaxLength(2000)]
        public string Problem { get; set; }
    }
}
