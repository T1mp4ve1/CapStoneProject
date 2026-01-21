using System.ComponentModel.DataAnnotations;

namespace backend.Model.DTO.AppUserDTO
{
    public class AppUser_Create
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }
    }
}