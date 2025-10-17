using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TTEC_API_Formacion.Data;
using TTEC_API_Formacion.Helpers;
using TTEC_API_Formacion.Models;
using TTEC_API_Formacion.Models.Dtos;

namespace TTEC_API_Formacion.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _db;
    public UsersController(AppDbContext db) => _db = db;

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        var users = await _db.Users.ToListAsync();
        return users.Select(u => u.ToDto()).ToList();
    }

    // GET: api/users/5
    [HttpGet("{id:int}", Name = "GetUser")]
    public async Task<ActionResult<UserDto>> GetById(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) return NotFound();
        return user.ToDto();
    }

    // POST: api/users
    [HttpPost]
    public async Task<ActionResult<UserDto>> Create([FromBody] CreateUserDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        // Normalizar entradas
    dto.Username = (dto.Username ?? string.Empty).Trim();
    dto.Email = (dto.Email ?? string.Empty).Trim();
    if (string.IsNullOrWhiteSpace(dto.Email)) return BadRequest("Email is required.");

        // Comprobación insensible a mayúsculas/minúsculas y espacios
        if (await _db.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest($"Username '{dto.Username}' already exists.");

        var emailNorm = dto.Email.ToLowerInvariant();
        if (await _db.Users.AnyAsync(u => u.Email.ToLower() == emailNorm))
            return BadRequest($"Email '{dto.Email}' already exists.");

        var user = dto.ToEntity();
        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return CreatedAtRoute("GetUser", new { id = user.Id }, user.ToDto());
    }

    // PUT: api/users/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateUserDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        if (id != dto.Id) return BadRequest("Id mismatch.");

        var existing = await _db.Users.FindAsync(id);
        if (existing == null) return NotFound();

        existing.ApplyUpdate(dto);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/users/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) return NotFound();

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // POST: api/users/login
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginUserDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // Buscar usuario por username y passwordHash
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Username == dto.Username && u.PasswordHash == dto.PasswordHash);

        if (user == null)
            return Unauthorized("Usuario o contraseña incorrectos.");

        return user.ToDto(); // Devuelve usuario sin passwordHash si ToDto lo omite
    }

}

