namespace LibraryManagementAPI.Models;

public partial class Librarian
{
    public uint Id { get; set; }

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string Login { get; set; }

    public required string Password { get; set; }
}