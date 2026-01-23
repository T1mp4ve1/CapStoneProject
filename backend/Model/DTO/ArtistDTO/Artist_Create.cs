using System.ComponentModel.DataAnnotations;

namespace backend.Model.DTO.ArtistDTO
{
    public class Artist_Create
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        public string Img { get; set; }

        [Required]
        [MaxLength(1000)]
        public string About { get; set; }
    }
}