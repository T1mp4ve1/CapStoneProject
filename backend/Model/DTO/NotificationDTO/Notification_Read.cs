namespace backend.Model.DTO.NotificationDTO
{
    public class Notification_Read
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public Guid OrderId { get; set; }
        public string State { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Read { get; set; }
    }
}
