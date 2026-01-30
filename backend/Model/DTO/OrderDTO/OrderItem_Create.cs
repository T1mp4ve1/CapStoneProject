namespace backend.Model.DTO.OrderDTO
{
    public class OrderItem_Create
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}