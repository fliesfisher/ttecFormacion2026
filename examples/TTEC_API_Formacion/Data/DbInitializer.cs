using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TTEC_API_Formacion.Models;

namespace TTEC_API_Formacion.Data
{
    public static class DbInitializer
    {
        /// <summary>
        /// Asegura la base de datos y hace seed de datos mínimos (categorías + productos).
        /// Llamar desde Program.cs durante el arranque (CreateScope).
        /// </summary>
        public static void Initialize(AppDbContext context)
        {
            // Create database and schema
            context.Database.EnsureCreated();

            if (!context.Users.Any())
            {
                context.Users.Add(new User
                {
                    Username = "admin",
                    PasswordHash = "HASH_SHA256_DESDE_FRONT",
                    Email = "admin@example.com",
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow
                });
                context.SaveChanges();
            }

            // Seed data only if Categories and Products are empty
            if (!context.Categories.Any())
            {
                var catElectronics = new Category { Name = "Electrónica", Description = "Dispositivos y accesorios" };
                var catOffice = new Category { Name = "Oficina", Description = "Material de oficina" };
                var catClothes = new Category { Name = "Ropa", Description = "Prendas de vestir" };
                var catHome = new Category { Name = "Hogar", Description = "Artículos para el hogar" };


                context.Categories.AddRange(catElectronics, catOffice, catClothes, catHome);
                context.SaveChanges();

                if (!context.Products.Any())
                {
                    var now = DateTime.UtcNow;
                    var products = new[]
                    {
                        new Product
                        {
                            Name = "Laptop",
                            Description = "Laptop de ejemplo 14\" - 8GB RAM - 256GB SSD",
                            Price = 500.00m,
                            StockQuantity = 10,
                            CreatedAt = now,
                            CategoryId = catElectronics.Id,
                            ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/915S89xhGgL._SL1500_.jpg"
                        },
                        new Product
                        {
                            Name = "Mouse",
                            Description = "Mouse óptico USB",
                            Price = 8.00m,
                            StockQuantity = 50,
                            CreatedAt = now,
                            CategoryId = catElectronics.Id,
                            ImageUrl = "https://tse4.mm.bing.net/th/id/OIP.A3X-DUhH1kCEaiWmdHyOGgHaFd?"
                        },
                        new Product
                        {
                            Name = "Auriculares Bluetooth",
                            Description = "Auriculares inalámbricos con micrófono",
                            Price = 29.99m,
                            StockQuantity = 25,
                            CreatedAt = now,
                            CategoryId = catElectronics.Id,
                            ImageUrl = "https://www.bing.com/th?id=OPEC.styS%2bWlJdJscHw474C474&o=5&pid=21.1&w=128&h=188&qlt=100&dpr=1&o=2&bw=6&bc=FFFFFF"
                        },
                        new Product
                        {
                            Name = "Bloc de notas A4",
                            Description = "Bloc de 50 hojas",
                            Price = 2.50m,
                            StockQuantity = 200,
                            CreatedAt = now,
                            CategoryId = catOffice.Id
                        },
                        new Product
                        {
                            Name = "Bolígrafo azul",
                            Description = "Paquete de 10 bolígrafos de tinta azul",
                            Price = 1.99m,
                            StockQuantity = 500,
                            CreatedAt = now,
                            CategoryId = catOffice.Id
                        },
                        new Product
                        {
                            Name = "Camisa blanca",
                            Description = "Camisa de algodón manga larga",
                            Price = 19.90m,
                            StockQuantity = 30,
                            CreatedAt = now,
                            CategoryId = catClothes.Id,
                            ImageUrl = "https://tse2.mm.bing.net/th/id/OIP.B3-M5s1lymACIQLzaXGl9QHaLH?w=203&h=304&c=7&r=0&o=7&pid=1.7&rm=3"
                        },
                        new Product
                        {
                            Name = "Pantalón vaquero",
                            Description = "Pantalón de mezclilla azul clásico",
                            Price = 39.99m,
                            StockQuantity = 20,
                            CreatedAt = now,
                            CategoryId = catClothes.Id,
                            ImageUrl = "https://example.com/images/jeans.jpg"
                        },
                        new Product
                        {
                            Name = "Taza de cerámica",
                            Description = "Taza blanca de 350ml",
                            Price = 4.50m,
                            StockQuantity = 100,
                            CreatedAt = now,
                            CategoryId = catHome.Id,
                            ImageUrl = "https://example.com/images/mug.jpg"
                        },
                        new Product
                        {
                            Name = "Cojín decorativo",
                            Description = "Cojín de tela 40x40cm",
                            Price = 12.00m,
                            StockQuantity = 40,
                            CreatedAt = now,
                            CategoryId = catHome.Id,
                            ImageUrl = "https://example.com/images/cushion.jpg"
                        }
                    };

                    context.Products.AddRange(products);
                    context.SaveChanges();
                }

            }
        }

    }
}
