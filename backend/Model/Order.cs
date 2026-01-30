using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Order
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public decimal Total { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public OrderStates State { get; set; }

        [Required]
        public List<OrderItem> Products { get; set; }

        [Required]
        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}