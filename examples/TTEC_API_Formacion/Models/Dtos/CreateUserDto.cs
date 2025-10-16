namespace TTEC_API_Formacion.Models.Dtos;

public class CreateUserDto
{
    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = "User";
}