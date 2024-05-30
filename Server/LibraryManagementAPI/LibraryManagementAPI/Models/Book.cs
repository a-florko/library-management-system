namespace LibraryManagementAPI.Models;

public partial class Book
{
    public uint Id { get; set; }

    public string? Title { get; set; }

    public string? Author { get; set; }

    public string? Overview { get; set; }

    public string? Language { get; set; }

    public uint? CopiesInStock { get; set; }

    public uint? TotalCopies { get; set; }
}
