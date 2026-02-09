namespace backend.Model.DTO.TicketDTO
{
    public class Ticket_Read
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public TicketState State { get; set; }
        public string UserId { get; set; }
        public string Problem { get; set; }
    }
}
