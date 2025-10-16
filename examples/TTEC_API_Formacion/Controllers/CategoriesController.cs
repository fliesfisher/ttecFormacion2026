using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TTEC_API_Formacion.Data;
using TTEC_API_Formacion.Helpers;
using TTEC_API_Formacion.Models;
using TTEC_API_Formacion.Models.Dtos;

namespace TTEC_API_Formacion.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _db;
    public CategoriesController(AppDbContext db) => _db = db;

    // GET: api/categories
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
    {
        var categories = await _db.Categories.ToListAsync();
        return categories.Select(c => c.ToDto()).ToList();
    }

    // GET: api/categories/5
    [HttpGet("{id:int}", Name = "GetCategory")]
    public async Task<ActionResult<CategoryDto>> GetById(int id)
    {
        var category = await _db.Categories.FindAsync(id);
        if (category == null) return NotFound();
        return category.ToDto();
    }

    // POST: api/categories
    [HttpPost]
    public async Task<ActionResult<CategoryDto>> Create([FromBody] CreateCategoryDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var category = dto.ToEntity();
        _db.Categories.Add(category);
        await _db.SaveChangesAsync();

        return CreatedAtRoute("GetCategory", new { id = category.Id }, category.ToDto());
    }

    // PUT: api/categories/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateCategoryDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        if (id != dto.Id) return BadRequest("El id de la ruta y del body no coinciden.");

        var existing = await _db.Categories.FindAsync(id);
        if (existing == null) return NotFound();

        existing.ApplyUpdate(dto);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/categories/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await _db.Categories
                                .Include(c => c.Products)
                                .FirstOrDefaultAsync(c => c.Id == id);
        if (category == null) return NotFound();

        if (category.Products != null && category.Products.Any())
        {
            return BadRequest("No se puede eliminar la categoría porque tiene productos asociados.");
        }

        _db.Categories.Remove(category);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}