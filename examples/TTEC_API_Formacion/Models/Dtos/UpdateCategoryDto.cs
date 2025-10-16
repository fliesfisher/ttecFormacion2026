using System.ComponentModel.DataAnnotations;

namespace TTEC_API_Formacion.Models.Dtos;

public class UpdateCategoryDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [MaxLength(250)]
    public string? Description { get; set; }
}
