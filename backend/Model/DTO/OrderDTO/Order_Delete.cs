namespace backend.Model.DTO.OrderDTO
{
    public class Order_Delete
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Total { get; set; }
        public string Address { get; set; }
        public OrderStates State { get; set; }
        public List<OrderItem_Read> Products { get; set; }
        public string UserId { get; set; }
    }
}
