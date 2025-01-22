using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using LibraryManagementAPI.Services.Contracts;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/librarians")]
    [ApiController]
    public class LibrariansController(LibraryDbContext context, ILibrarianService librarianService) : ControllerBase
    {
        private readonly LibraryDbContext _context = context;
        private readonly ILibrarianService _librarianService = librarianService;
        private readonly PasswordHasher<string> _passwordHasher = new();

        [HttpPost("try-to-log-in")]
        public async Task<IActionResult> TryToLogIn(LibrarianLogInDto logInDto)
        {
            Librarian? librarian = await _librarianService.TryToLogInAsync(logInDto);
            if (librarian == null) return Unauthorized("Invalid credentials");
            return Ok(new { id = librarian.Id , fullName = $"{librarian.FirstName} {librarian.LastName}" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibrarian(int id, Librarian librarian)
        {
            if (id != librarian.Id)
            {
                return BadRequest();
            }

            _context.Entry(librarian).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_librarianService.ExistById(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Librarian>> PostLibrarian(LibrarianRegisterDto librarian)
        {
            bool result = await _librarianService.RegisterAsync(librarian);
            if (result) return Created();
            else return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibrarian(int id)
        {
            var librarian = await _context.Librarians.FindAsync(id);
            if (librarian == null)
            {
                return NotFound();
            }

            _context.Librarians.Remove(librarian);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
