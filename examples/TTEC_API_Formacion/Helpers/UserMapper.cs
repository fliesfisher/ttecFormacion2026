using TTEC_API_Formacion.Models;
using TTEC_API_Formacion.Models.Dtos;

namespace TTEC_API_Formacion.Helpers;

public static class UserMapper
{
    public static UserDto ToDto(this User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            CreatedAt = user.CreatedAt
        };
    }

    public static User ToEntity(this CreateUserDto dto)
    {
        return new User
        {
            Username = dto.Username,
            PasswordHash = dto.PasswordHash,
            Email = dto.Email,
            Role = dto.Role,
            CreatedAt = DateTime.UtcNow
        };
    }

    public static void ApplyUpdate(this User user, UpdateUserDto dto)
    {
        if (!string.IsNullOrEmpty(dto.PasswordHash)) user.PasswordHash = dto.PasswordHash;
        if (!string.IsNullOrEmpty(dto.Email)) user.Email = dto.Email;
        if (!string.IsNullOrEmpty(dto.Role)) user.Role = dto.Role;
    }
}
