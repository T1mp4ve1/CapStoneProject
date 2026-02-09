using System.ComponentModel.DataAnnotations;

namespace backend.Model.DTO.TicketDTO
{
    public class Ticket_Update
    {
        [Required]
        [MaxLength(2000)]
        public string Problem { get; set; }
    }

    public class TicketState_Update
    {
        [Required]
        public TicketState State { get; set; }
    }
}