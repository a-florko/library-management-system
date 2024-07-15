namespace LibraryManagementAPI.Models
{
    public partial class IssueBookDto
    {
        public required string BookTitle { get; set; }
        public required string FullReaderName { get; set; }
        public required string IssuedBy { get; set; }
        public required DateOnly IssueDate { get; set; }
        public required DateOnly ReturnBefore { get; set; }
        public string Notes { get; set; } = "";
    }
}