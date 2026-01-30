using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class OrderItem
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid OrderId { get; set; }
        public Order Order { get; set; }

        [Required]
        public Guid ProductId { get; set; }
        public Guitar Product { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }
    }
}
