namespace TTEC_API_Formacion.Models.Dtos;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = "User";
    public DateTime CreatedAt { get; set; }
}