using System.ComponentModel.DataAnnotations;

namespace TTEC_API_Formacion.Models.Dtos;

public class CreateCategoryDto
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [MaxLength(250)]
    public string? Description { get; set; }
}
