using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using LibraryManagementAPI.Services.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementAPI.Services.Implementations
{
    public class LibrarianService(LibraryDbContext context) : ILibrarianService
    {
        private readonly LibraryDbContext _context = context;
        private readonly PasswordHasher<string> _passwordHasher = new();

        public bool ExistById(int id)
        {
            bool librarian = _context.Librarians.Any(b => b.Id == id);
            return librarian;
        }

        public async Task<Librarian?> TryToLogInAsync(LibrarianLogInDto logInDto)
        {
            Librarian? librarian = await _context.Librarians.SingleOrDefaultAsync(l => l.Login == logInDto.Login);
            if (librarian is null) return null;

            PasswordVerificationResult result = _passwordHasher.VerifyHashedPassword(librarian.LastName, librarian.Password, logInDto.Password);

            if (result == PasswordVerificationResult.Failed) return null;
            else if (result == PasswordVerificationResult.SuccessRehashNeeded)
            { 
                RehashPasswordAsync(librarian);
            }
            return librarian;
        }

        public async Task<bool> RegisterAsync(LibrarianRegisterDto librarianRegisterDto)
        {
            try
            {
                Librarian librarian = new()
                {
                    FirstName = librarianRegisterDto.FirstName,
                    LastName = librarianRegisterDto.LastName,
                    Login = $"librarian_{librarianRegisterDto.FirstName.ToLower()}_{librarianRegisterDto.LastName.ToLower()}",
                    Password = _passwordHasher.HashPassword(librarianRegisterDto.LastName, librarianRegisterDto.Password)
                };

                await _context.Librarians.AddAsync(librarian);
                await _context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        private async void RehashPasswordAsync(Librarian librarian)
        {
            string newPassword = _passwordHasher.HashPassword(librarian.LastName, librarian.Password);
            librarian.Password = newPassword;

            _context.Entry(librarian).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return;
        }
    }
}
