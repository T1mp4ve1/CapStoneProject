using System.ComponentModel.DataAnnotations;

namespace backend.Model.DTO.AppUserDTO
{
    public class Login_DTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
