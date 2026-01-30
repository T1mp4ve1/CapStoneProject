using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Order
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string ProductId { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}