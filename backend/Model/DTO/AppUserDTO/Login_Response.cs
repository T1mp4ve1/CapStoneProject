namespace backend.Model.DTO.AppUserDTO
{
    public class Login_Response
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public IList<string> Roles { get; set; }
    }
}
