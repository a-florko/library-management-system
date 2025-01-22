using LibraryManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementAPI.Data;

public partial class LibraryDbContext : DbContext
{
    public LibraryDbContext(DbContextOptions<LibraryDbContext> options)
        : base(options)
    {
    }
    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<Borrower> Borrowers { get; set; }

    public virtual DbSet<IssuedBook> IssuedBooks { get; set; }

    public virtual DbSet<Librarian> Librarians { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("book");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Author)
                .HasMaxLength(100)
                .HasColumnName("author");
            entity.Property(e => e.CopiesInStock).HasColumnName("copies_in_stock");
            entity.Property(e => e.Language)
                .HasMaxLength(50)
                .HasColumnName("language");
            entity.Property(e => e.Overview)
                .HasMaxLength(1800)
                .HasColumnName("overview");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
            entity.Property(e => e.TotalCopies).HasColumnName("total_copies");
        });

        modelBuilder.Entity<Borrower>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("borrower");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.Telephone)
                .HasMaxLength(20)
                .HasColumnName("telephone");
        });

        modelBuilder.Entity<IssuedBook>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("issued_book");

            entity.HasIndex(e => e.BookId, "book_id");

            entity.HasIndex(e => e.BorrowerId, "borrower_id");

            entity.HasIndex(e => e.LibrarianId, "librarian_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.BorrowerId).HasColumnName("borrower_id");
            entity.Property(e => e.IssueDate).HasColumnName("issue_date");
            entity.Property(e => e.LibrarianId).HasColumnName("librarian_id");
            entity.Property(e => e.Notes)
                .HasColumnType("text")
                .HasColumnName("notes");
            entity.Property(e => e.ReturnBefore).HasColumnName("return_before");

            entity.HasOne(d => d.Book).WithMany(p => p.IssuedBooks)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("issued_book_ibfk_1");

            entity.HasOne(d => d.Borrower).WithMany(p => p.IssuedBooks)
                .HasForeignKey(d => d.BorrowerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("issued_book_ibfk_2");

            entity.HasOne(d => d.Librarian).WithMany(p => p.IssuedBooks)
                .HasForeignKey(d => d.LibrarianId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("issued_book_ibfk_3");
        });

        modelBuilder.Entity<Librarian>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("librarian");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("last_name");
            entity.Property(e => e.Login)
                .HasMaxLength(150)
                .HasColumnName("login");
            entity.Property(e => e.Password)
                .HasMaxLength(150)
                .HasColumnName("password");
        });

        modelBuilder.Entity<Book>().HasData(
            new Book { Id = 1, Title = "Moloka'i", Author = "Alan Brennert", Overview = "An enlightening historical saga... Washington Post Hawaii, 1892. Rachel Kalama, a seven-year-old Hawaiian girl with a lively and mischievous spirit, dreams of visiting distant lands like her father, who serves in the merchant marine. Until one day, a pink spot appears on her skin, and her dreams of elsewhere vanish instantly. Taken from her home and family, Rachel is sent to Kalaupapa, a quarantine camp on the island of Moloka'i. It is there that her life is supposed to end – but she realizes that it is actually just beginning. Overflowing with warmth, humor, compassion, and a wonderfully portrayed cast of characters, this storytelling masterpiece speaks of a people who, in the face of the harsh reality of death, chose life.", Language = "English", CopiesInStock = 0, TotalCopies = 1 },
            new Book { Id = 2, Title = "A Court of Mist and Fury", Author = "Sarah J. Maas", Overview = "Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.\n\nAs her marriage to Tamlin approaches, Feyre's hollowness and nightmares consume her. She finds herself split into two different people: one who upholds her bargain with Rhysand, High Lord of the feared Night Court, and one who lives out her life in the Spring Court with Tamlin. While Feyre navigates a dark web of politics, passion, and dazzling power, a greater evil looms. She might just be the key to stopping it, but only if she can harness her harrowing gifts, heal her fractured soul, and decide how she wishes to shape her future-and the future of a world in turmoil.\n\nBestselling author Sarah J. Maas's masterful storytelling brings this second book in her dazzling, sexy, action-packed series to new heights.", Language = "English", CopiesInStock = 1, TotalCopies = 1 },
            new Book { Id = 5, Title = "To Kill a Mockingbird", Author = "Harper Lee", Overview = "A novel about the serious issues of rape and racial inequality told from the perspective of a young girl in the Deep South.", Language = "English", CopiesInStock = 4, TotalCopies = 5 },
            new Book { Id = 6, Title = "1984", Author = "George Orwell", Overview = "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.", Language = "English", CopiesInStock = 6, TotalCopies = 8 },
            new Book { Id = 7, Title = "One Hundred Years of Solitude", Author = "Gabriel Garcia Marquez", Overview = "A multi-generational story that explores the magical and surreal experiences of the Buendía family.", Language = "Spanish", CopiesInStock = 7, TotalCopies = 7 },
            new Book { Id = 8, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", Overview = "A story about the young and mysterious millionaire Jay Gatsby and his quixotic passion for the beautiful Daisy Buchanan.", Language = "English", CopiesInStock = 3, TotalCopies = 3 },
            new Book { Id = 9, Title = "The Alchemist", Author = "Paulo Coelho", Overview = "A philosophical book that tells the story of a young Andalusian shepherd on his journey to the pyramids of Egypt.", Language = "Portuguese", CopiesInStock = 5, TotalCopies = 4 },
            new Book { Id = 10, Title = "The Secret Language of Birthdays", Author = "Gary Goldschneider and Joost Elffers", Overview = "Many have suspected that your birthday affects your personality and how you relate to others. Nineteen years and over one million copies later, The Secret Language of Birthdays continues to fascinate readers by describing the characteristics associated with being born on a particular day. And being born on a particular month describe one's personality..", Language = "English", CopiesInStock = 4, TotalCopies = 4 },
            new Book { Id = 12, Title = "The Hound of the Baskervilles", Author = "Arthur Conan Doyle", Overview = "The Hound of the Baskervilles is the third of the four crime novels by British writer Arthur Conan Doyle featuring the detective Sherlock Holmes. Originally serialised in The Strand Magazine from August 1901 to April 1902, it is set in 1889 largely on Dartmoor in Devon in England's West Country and tells the story of an attempted murder inspired by the legend of a fearsome, diabolical hound of supernatural origin. Holmes and Watson investigate the case. This was the first appearance of Holmes since his apparent death in \"The Final Problem\", and the success of The Hound of the Baskervilles led to the character's eventual revival.\nOne of the most famous stories ever written, in 2003, the book was listed as number 128 of 200 on the BBC's The Big Read poll of the UK's \"best-loved novel\". In 1999, a poll of \"Sherlockians\" ranked it as the best of the four Holmes novels.", Language = "English, Finnish, German, Spanish, Polish", CopiesInStock = 6, TotalCopies = 6 },
            new Book { Id = 23, Title = "Test Book", Author = "Test", Overview = "dd", Language = "Eng", CopiesInStock = 0, TotalCopies = 1 },
            new Book { Id = 24, Title = "The complete poems of Francis Ledwidge", Author = "Francis Ledwidge", Overview = "", Language = "English", CopiesInStock = 5, TotalCopies = 6 }
        );

        modelBuilder.Entity<Borrower>().HasData(
            new Borrower { Id = 1, FullName = "John Doe", Telephone = "(555) 123-4567", Email = "john.doe@example.com" },
            new Borrower { Id = 2, FullName = "Alex Johnson", Telephone = "+1-555-123-4567", Email = "alex.johnson@example.com" },
            new Borrower { Id = 3, FullName = "Maria Garcia", Telephone = "+1-555-987-6543", Email = "maria.garcia@example.com" },
            new Borrower { Id = 4, FullName = "Liam Smith", Telephone = "+1-555-246-8101", Email = "liam.smith@example.com" },
            new Borrower { Id = 5, FullName = "Emma Brown", Telephone = "+1-555-135-7913", Email = "emma.brown@example.com" },
            new Borrower { Id = 6, FullName = "Noah Wilson", Telephone = "+1-555-321-0987", Email = "noah.wilson@example.com" },
            new Borrower { Id = 7, FullName = "Olivia Davis", Telephone = "+1-555-654-3210", Email = "olivia.davis@example.com" },
            new Borrower { Id = 8, FullName = "William Taylor", Telephone = "+1-555-789-0123", Email = "william.taylor@example.com" },
            new Borrower { Id = 9, FullName = "Ava Martinez", Telephone = "+1-555-876-5432", Email = "ava.martinez@example.com" },
            new Borrower { Id = 10, FullName = "James Anderson", Telephone = "+1-555-234-5678", Email = "james.anderson@example.com" },
            new Borrower { Id = 11, FullName = "Sophia Thomas", Telephone = "+1-555-567-8901", Email = "sophia.thomas@example.com" }
        );

        modelBuilder.Entity<Librarian>().HasData(
            new Librarian { Id = 16, FirstName = "Test", LastName = "User", Login = "librarian_test_user", Password = "AQAAAAIAAYagAAAAEIDBJ989IN736ilY0FayybfTiIAxknayxo2MGhwVLtdH1yLAIY32SGOwoVNvLmLduA==" }
        );

        modelBuilder.Entity<IssuedBook>().HasData(
            new IssuedBook { Id = 10, BookId = 1, BorrowerId = 10, LibrarianId = 16, IssueDate = new DateOnly(2024, 8, 15), ReturnBefore = new DateOnly(2024, 9, 8), Notes = "First issued book" },
            new IssuedBook { Id = 12, BookId = 6, BorrowerId = 3, LibrarianId = 16, IssueDate = new DateOnly(2024, 8, 19), ReturnBefore = new DateOnly(2024, 9, 7), Notes = "Second issued book" },
            new IssuedBook { Id = 13, BookId = 6, BorrowerId = 4, LibrarianId = 16, IssueDate = new DateOnly(2024, 8, 19), ReturnBefore = new DateOnly(2024, 8, 22), Notes = "Third issued book" },
            new IssuedBook { Id = 14, BookId = 5, BorrowerId = 9, LibrarianId = 16, IssueDate = new DateOnly(2024, 8, 15), ReturnBefore = new DateOnly(2024, 8, 27), Notes = "Fourth issued book" },
            new IssuedBook { Id = 15, BookId = 24, BorrowerId = 6, LibrarianId = 16, IssueDate = new DateOnly(2024, 8, 16), ReturnBefore = new DateOnly(2024, 8, 23), Notes = "Fifth issued book" }
        );
    }
}
