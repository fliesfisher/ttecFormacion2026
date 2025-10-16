namespace TTEC_API_Formacion.Models.Dtos;

public class UpdateUserDto
{
    public int Id { get; set; }
    public string? PasswordHash { get; set; }
    public string? Email { get; set; }
    public string? Role { get; set; }
}