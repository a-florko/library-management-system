namespace LibraryManagementAPI.Models;

public partial class Book
{
    public uint Id { get; set; }

    public required string Title { get; set; }

    public required string Author { get; set; }

    public string? Overview { get; set; }

    public required string Language { get; set; }

    public uint CopiesInStock { get; set; }

    public uint TotalCopies { get; set; }
}
