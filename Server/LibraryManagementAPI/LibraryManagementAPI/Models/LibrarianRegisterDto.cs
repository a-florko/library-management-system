namespace LibraryManagementAPI.Models
{
    public class LibrarianRegisterDto
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Password { get; set; }
    }
}