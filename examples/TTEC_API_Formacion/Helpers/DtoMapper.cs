using System.Linq;
using TTEC_API_Formacion.Models;
using TTEC_API_Formacion.Models.Dtos;

namespace TTEC_API_Formacion.Helpers;

public static class DtoMapper
{
    // Product -> ProductDto
    public static ProductDto ToDto(this Product p)
    {
        return new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            StockQuantity = p.StockQuantity,
            CreatedAt = p.CreatedAt,
            UpdatedAt = p.UpdatedAt,
            DeactivatedAt = p.DeactivatedAt,
            CategoryId = p.CategoryId,
            CategoryName = p.Category?.Name,
            ImageUrl = p.ImageUrl
        };
    }

    // CreateProductDto -> Product
    public static Product ToEntity(this CreateProductDto dto)
    {
        return new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            StockQuantity = dto.StockQuantity,
            CategoryId = dto.CategoryId,
            ImageUrl = dto.ImageUrl,
            CreatedAt = System.DateTime.UtcNow
        };
    }

    // UpdateProductDto -> apply to existing Product
    public static void ApplyUpdate(this Product target, UpdateProductDto dto)
    {
        target.Name = dto.Name;
        target.Description = dto.Description;
        target.Price = dto.Price;
        target.StockQuantity = dto.StockQuantity;
        target.CategoryId = dto.CategoryId;
        target.ImageUrl = dto.ImageUrl;
        target.UpdatedAt = System.DateTime.UtcNow;
    }

    // Category mappers
    public static CategoryDto ToDto(this Category c) =>
        new CategoryDto { Id = c.Id, Name = c.Name, Description = c.Description };

    public static Category ToEntity(this CreateCategoryDto dto) =>
        new Category { Name = dto.Name, Description = dto.Description };

    public static void ApplyUpdate(this Category target, UpdateCategoryDto dto)
    {
        target.Name = dto.Name;
        target.Description = dto.Description;
    }
}
