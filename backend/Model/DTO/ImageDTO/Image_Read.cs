namespace backend.Model.DTO.ImageDTO
{
    public class Image_Read
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public ImageTypes EntityType { get; set; }
        public string EntityId { get; set; }
        public bool IsMain { get; set; }
    }
}
