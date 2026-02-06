namespace backend.Model.DTO.AppUserDTO
{
    public class AppUser_Update
    {
        public string? Email { get; set; }
        public bool? EmailConfirmed { get; set; }
        public string? UserName { get; set; }
        public string? FirstName { get; set; }
        public string? PhoneNumber { get; set; }
        public bool? PhoneNumberConfirmed { get; set; }
    }
}