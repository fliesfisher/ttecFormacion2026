using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TTEC_API_Formacion.Data;
using TTEC_API_Formacion.Helpers;
using TTEC_API_Formacion.Models;
using TTEC_API_Formacion.Models.Dtos;

namespace TTEC_API_Formacion.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ProductsController(AppDbContext db) => _db = db;

    // GET: api/products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll(int pageNumber = 1, int pageSize = 20)
    {
        var products = await _db.Products
                                .Include(p => p.Category)
                                .Skip((pageNumber - 1) * pageSize)
                                .Take(pageSize)
                                .ToListAsync();
        return products.Select(p => p.ToDto()).ToList();
    }

    // GET: api/products/5
    [HttpGet("{id:int}", Name = "GetProduct")]
    public async Task<ActionResult<ProductDto>> GetById(int id)
    {
        var product = await _db.Products
                               .Include(p => p.Category)
                               .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null) return NotFound();
        return product.ToDto();
    }

    // POST: api/products
    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // Validate CategoryId if provided
        if (dto.CategoryId.HasValue)
        {
            var catExists = await _db.Categories.AnyAsync(c => c.Id == dto.CategoryId.Value);
            if (!catExists) return BadRequest($"Category with id {dto.CategoryId.Value} does not exist.");
        }

        var product = dto.ToEntity();
        _db.Products.Add(product);
        await _db.SaveChangesAsync();

        // Load category for DTO
        await _db.Entry(product).Reference(p => p.Category).LoadAsync();

        var resultDto = product.ToDto();
        return CreatedAtRoute("GetProduct", new { id = resultDto.Id }, resultDto);
    }

    // PUT: api/products/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        if (id != dto.Id) return BadRequest("El id de la ruta y del body no coinciden.");

        var existing = await _db.Products.FindAsync(id);
        if (existing == null) return NotFound();

        if (dto.CategoryId.HasValue && dto.CategoryId != existing.CategoryId)
        {
            var catExists = await _db.Categories.AnyAsync(c => c.Id == dto.CategoryId.Value);
            if (!catExists) return BadRequest($"Category with id {dto.CategoryId.Value} does not exist.");
        }

        existing.ApplyUpdate(dto);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/products/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null) return NotFound();

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // POST: api/products/deactivate/5
    [HttpPost("deactivate/{id:int}")]
    public async Task<IActionResult> Deactivate(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null) return NotFound();

        product.DeactivatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return NoContent();
    }

    // POST: api/products/reactivate/5
    [HttpPost("reactivate/{id:int}")]
    public async Task<IActionResult> Reactivate(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null) return NotFound();

        product.DeactivatedAt = null;
        await _db.SaveChangesAsync();
        return NoContent();
    }


}
