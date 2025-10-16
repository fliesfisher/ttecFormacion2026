public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!; // SHA256 desde front
    public string Email { get; set; } = null!;
    public string Role { get; set; } = "User"; // rol simple por ahora
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeactivatedAt { get; set; } // nullable
}