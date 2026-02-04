using System.ComponentModel.DataAnnotations;

namespace backend.Model.DTO.NotificationDTO
{
    public class Notification_Create
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public Guid OrderId { get; set; }

        [Required]
        public string State { get; set; }
    }
}