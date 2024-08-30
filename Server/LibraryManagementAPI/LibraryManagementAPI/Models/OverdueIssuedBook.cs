namespace LibraryManagementAPI.Models
{
    public class OverdueIssuedBook
    {
        public int Id { get; set; }
        public required string BookTitle { get; set; }
        public required string BorrowerFullName { get; set; }
        public required string BorrowerTelephone { get; set; }
        public required string BorrowerEmail { get; set; }
        public required int Overdue { get; set; }
    }
}
