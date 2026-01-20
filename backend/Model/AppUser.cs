using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}