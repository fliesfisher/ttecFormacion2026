namespace TTEC_API_Formacion.Models.Dtos
{
    public class LoginUserDto
    {
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
    }
}
