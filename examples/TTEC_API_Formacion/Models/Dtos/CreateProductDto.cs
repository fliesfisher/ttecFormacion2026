using System.ComponentModel.DataAnnotations;

namespace TTEC_API_Formacion.Models.Dtos;

public class CreateProductDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Range(0.01, 1_000_000)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }

    public int? CategoryId { get; set; }

    [MaxLength(2048)]
    [Url]
    public string? ImageUrl { get; set; }
}
