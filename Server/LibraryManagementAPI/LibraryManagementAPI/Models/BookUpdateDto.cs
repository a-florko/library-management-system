namespace LibraryManagementAPI.Models
{
    public class BookUpdateDto
    {
        public required string Author { get; set; }
        public required string Overview { get; set; }
        public required string Language { get; set; }
        public uint CopiesInStock { get; set; }
        public uint TotalCopies { get; set; }
    }
}