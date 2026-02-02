namespace backend.Model.DTO.OrderDTO
{
    public class Order_Update
    {
        public string Address { get; set; }
        public OrderStates State { get; set; }
    }
}