namespace backend.Model.DTO.GuitarDTO
{
    public class Guitar_Read
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
    }
}