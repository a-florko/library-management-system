using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using Microsoft.AspNet.Identity;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/librarians")]
    [ApiController]
    public class LibrariansController(LibraryDbContext context) : ControllerBase
    {
        private readonly LibraryDbContext _context = context;
        private readonly PasswordHasher _passwordHasher = new();

        [HttpPost("try-to-log-in")]
        public async Task<IActionResult> TryToLogIn(LogInDto logInDto)
        {
            Librarian? librarian = _context.Librarians.SingleOrDefault(l => l.Login == logInDto.Login);
            if (librarian != null)
            {
                PasswordVerificationResult result = _passwordHasher.VerifyHashedPassword(librarian.Password, logInDto.Password);
                if (result == PasswordVerificationResult.Failed) return Unauthorized();
                else if (result == PasswordVerificationResult.SuccessRehashNeeded)
                { 
                    RehashPassword(librarian);
                }
                return Ok(new { fullName = $"{librarian.FirstName} {librarian.LastName}" });

            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibrarian(uint id, Librarian librarian)
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
                if (!LibrarianExists(id))
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
        public async Task<ActionResult<Librarian>> PostLibrarian(Librarian librarian)
        {
            librarian.Password = _passwordHasher.HashPassword(librarian.Password);
            _context.Librarians.Add(librarian);
            await _context.SaveChangesAsync();

            return Created();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibrarian(uint id)
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

        private bool LibrarianExists(uint id)
        {
            return _context.Librarians.Any(e => e.Id == id);
        }

        private async void RehashPassword(Librarian librarian)
        {
            string newPassword = _passwordHasher.HashPassword(librarian.Password);
            librarian.Password = newPassword;
            await PutLibrarian(librarian.Id, librarian);
        }

    }
}
