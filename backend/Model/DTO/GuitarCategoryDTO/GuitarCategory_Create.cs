using System.ComponentModel.DataAnnotations;

namespace backend.Model.DTO.GuitarCategoryDTO
{
    public class GuitarCategory_Create
    {
        [Required]
        public string CategoryName { get; set; }
    }
}