namespace backend.Model.DTO.OrderDTO
{
    public class Order_Create
    {
        public string Address { get; set; }
        public List<OrderItem_Create> Products { get; set; }
        public string UserId { get; set; }
    }
}