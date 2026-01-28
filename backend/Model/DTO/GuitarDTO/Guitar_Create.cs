namespace backend.Model.DTO.GuitarDTO
{
    public class Guitar_Create
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }
        public int CategoryId { get; set; }
    }
}
