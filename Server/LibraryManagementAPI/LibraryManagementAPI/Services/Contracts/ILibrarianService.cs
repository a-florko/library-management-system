using LibraryManagementAPI.Models;

namespace LibraryManagementAPI.Services.Contracts
{
    public interface ILibrarianService
    {
        bool ExistById(int id);
        Task<Librarian?> TryToLogInAsync(LibrarianLogInDto librarianLogInDto);
        Task<bool> RegisterAsync(LibrarianRegisterDto librarianRegisterDto);
    }
}
