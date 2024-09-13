using LibraryManagementAPI.Models;

namespace LibraryManagementAPI.Services.Contracts
{
    public interface IBorrowerService
    {
        Task<List<BorrowerDto>> GetDtoBorrowers();
        bool ExistById(int id);
    }
}
