using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TTEC_API_Formacion.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;             // Nombre obligatorio

    [MaxLength(1000)]
    public string? Description { get; set; }              // Descripción opcional

    [Range(0.01, 1_000_000)]
    public decimal Price { get; set; }                    // Precio > 0 (decimal recomendado)

    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }                // Stock >= 0

    public DateTime CreatedAt { get; set; }               // Se puede setear en el seeding / controller
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeactivatedAt { get; set; }  // nullable


    // Relación con Category (opcional dejar CategoryId sin Required para permitir creación sin categoría)
    public int? CategoryId { get; set; }
    public Category? Category { get; set; }

    [MaxLength(2048)]
    [Url]                                                  // valida que, si viene, sea una URL válida
    public string? ImageUrl { get; set; }                   // URL opcional de la imagen principal
}