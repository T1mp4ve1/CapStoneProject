using System.ComponentModel.DataAnnotations;

namespace backend.Model.DTO.ImageDTO
{
    public class Image_Create
    {

        [Required]
        public string Url { get; set; }

        [Required]
        public ImageTypes EntityType { get; set; }

        public string EntityId { get; set; }

        [Required]
        public bool IsMain { get; set; }
    }
}
