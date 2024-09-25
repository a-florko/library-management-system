using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using LibraryManagementAPI.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementAPI.Services.Implementations
{
    public class BorrowerService(LibraryDbContext context) : IBorrowerService
    {
        private readonly LibraryDbContext _context = context;

        public async Task<List<BorrowerDto>> GetDtoBorrowers()
        {
            var dtoBorrowers = await _context.Borrowers.Select(
                b => new BorrowerDto {
                    Id = b.Id,
                    FullName = b.FullName
                }).ToListAsync();

            return dtoBorrowers;
        }

        public bool ExistById(int id)
        {
            return _context.Borrowers.Any(b => b.Id == id);
        }

        public async Task<List<BorrowerDto>> AvailableBorrowersForBook(int bookId)
        {
            var issuedBooks = await _context.IssuedBooks
                .Where(b => b.BookId == bookId)
                .ToListAsync();

            var availableBorrowers = await _context.Borrowers
                .Where(b => !issuedBooks.Any(ib => ib.BorrowerId == b.Id))
                .Select(b => new BorrowerDto
                {
                    Id = b.Id,
                    FullName = b.FullName
                }).ToListAsync();

            return availableBorrowers;
        }
    }
}
