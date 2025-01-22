using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LibraryManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "book",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    title = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    author = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    overview = table.Column<string>(type: "varchar(1800)", maxLength: 1800, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    language = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    copies_in_stock = table.Column<uint>(type: "int unsigned", nullable: false),
                    total_copies = table.Column<uint>(type: "int unsigned", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "borrower",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    full_name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    telephone = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "librarian",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    first_name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    last_name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    login = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    password = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "issued_book",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    book_id = table.Column<int>(type: "int", nullable: false),
                    borrower_id = table.Column<int>(type: "int", nullable: false),
                    librarian_id = table.Column<int>(type: "int", nullable: false),
                    issue_date = table.Column<DateOnly>(type: "date", nullable: false),
                    return_before = table.Column<DateOnly>(type: "date", nullable: false),
                    notes = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "issued_book_ibfk_1",
                        column: x => x.book_id,
                        principalTable: "book",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "issued_book_ibfk_2",
                        column: x => x.borrower_id,
                        principalTable: "borrower",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "issued_book_ibfk_3",
                        column: x => x.librarian_id,
                        principalTable: "librarian",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "book",
                columns: new[] { "id", "author", "copies_in_stock", "language", "overview", "title", "total_copies" },
                values: new object[,]
                {
                    { 1, "Alan Brennert", 0u, "English", "An enlightening historical saga... Washington Post Hawaii, 1892. Rachel Kalama, a seven-year-old Hawaiian girl with a lively and mischievous spirit, dreams of visiting distant lands like her father, who serves in the merchant marine. Until one day, a pink spot appears on her skin, and her dreams of elsewhere vanish instantly. Taken from her home and family, Rachel is sent to Kalaupapa, a quarantine camp on the island of Moloka'i. It is there that her life is supposed to end – but she realizes that it is actually just beginning. Overflowing with warmth, humor, compassion, and a wonderfully portrayed cast of characters, this storytelling masterpiece speaks of a people who, in the face of the harsh reality of death, chose life.", "Moloka'i", 1u },
                    { 2, "Sarah J. Maas", 1u, "English", "Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.\n\nAs her marriage to Tamlin approaches, Feyre's hollowness and nightmares consume her. She finds herself split into two different people: one who upholds her bargain with Rhysand, High Lord of the feared Night Court, and one who lives out her life in the Spring Court with Tamlin. While Feyre navigates a dark web of politics, passion, and dazzling power, a greater evil looms. She might just be the key to stopping it, but only if she can harness her harrowing gifts, heal her fractured soul, and decide how she wishes to shape her future-and the future of a world in turmoil.\n\nBestselling author Sarah J. Maas's masterful storytelling brings this second book in her dazzling, sexy, action-packed series to new heights.", "A Court of Mist and Fury", 1u },
                    { 5, "Harper Lee", 4u, "English", "A novel about the serious issues of rape and racial inequality told from the perspective of a young girl in the Deep South.", "To Kill a Mockingbird", 5u },
                    { 6, "George Orwell", 6u, "English", "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.", "1984", 8u },
                    { 7, "Gabriel Garcia Marquez", 7u, "Spanish", "A multi-generational story that explores the magical and surreal experiences of the Buendía family.", "One Hundred Years of Solitude", 7u },
                    { 8, "F. Scott Fitzgerald", 3u, "English", "A story about the young and mysterious millionaire Jay Gatsby and his quixotic passion for the beautiful Daisy Buchanan.", "The Great Gatsby", 3u },
                    { 9, "Paulo Coelho", 5u, "Portuguese", "A philosophical book that tells the story of a young Andalusian shepherd on his journey to the pyramids of Egypt.", "The Alchemist", 4u },
                    { 10, "Gary Goldschneider and Joost Elffers", 4u, "English", "Many have suspected that your birthday affects your personality and how you relate to others. Nineteen years and over one million copies later, The Secret Language of Birthdays continues to fascinate readers by describing the characteristics associated with being born on a particular day. And being born on a particular month describe one's personality..", "The Secret Language of Birthdays", 4u },
                    { 12, "Arthur Conan Doyle", 6u, "English, Finnish, German, Spanish, Polish", "The Hound of the Baskervilles is the third of the four crime novels by British writer Arthur Conan Doyle featuring the detective Sherlock Holmes. Originally serialised in The Strand Magazine from August 1901 to April 1902, it is set in 1889 largely on Dartmoor in Devon in England's West Country and tells the story of an attempted murder inspired by the legend of a fearsome, diabolical hound of supernatural origin. Holmes and Watson investigate the case. This was the first appearance of Holmes since his apparent death in \"The Final Problem\", and the success of The Hound of the Baskervilles led to the character's eventual revival.\nOne of the most famous stories ever written, in 2003, the book was listed as number 128 of 200 on the BBC's The Big Read poll of the UK's \"best-loved novel\". In 1999, a poll of \"Sherlockians\" ranked it as the best of the four Holmes novels.", "The Hound of the Baskervilles", 6u },
                    { 23, "Test", 0u, "Eng", "dd", "Test Book", 1u },
                    { 24, "Francis Ledwidge", 5u, "English", "", "The complete poems of Francis Ledwidge", 6u }
                });

            migrationBuilder.InsertData(
                table: "borrower",
                columns: new[] { "id", "email", "full_name", "telephone" },
                values: new object[,]
                {
                    { 1, "john.doe@example.com", "John Doe", "(555) 123-4567" },
                    { 2, "alex.johnson@example.com", "Alex Johnson", "+1-555-123-4567" },
                    { 3, "maria.garcia@example.com", "Maria Garcia", "+1-555-987-6543" },
                    { 4, "liam.smith@example.com", "Liam Smith", "+1-555-246-8101" },
                    { 5, "emma.brown@example.com", "Emma Brown", "+1-555-135-7913" },
                    { 6, "noah.wilson@example.com", "Noah Wilson", "+1-555-321-0987" },
                    { 7, "olivia.davis@example.com", "Olivia Davis", "+1-555-654-3210" },
                    { 8, "william.taylor@example.com", "William Taylor", "+1-555-789-0123" },
                    { 9, "ava.martinez@example.com", "Ava Martinez", "+1-555-876-5432" },
                    { 10, "james.anderson@example.com", "James Anderson", "+1-555-234-5678" },
                    { 11, "sophia.thomas@example.com", "Sophia Thomas", "+1-555-567-8901" }
                });

            migrationBuilder.InsertData(
                table: "librarian",
                columns: new[] { "id", "first_name", "last_name", "login", "password" },
                values: new object[] { 16, "Test", "User", "librarian_test_user", "AQAAAAIAAYagAAAAEIDBJ989IN736ilY0FayybfTiIAxknayxo2MGhwVLtdH1yLAIY32SGOwoVNvLmLduA==" });

            migrationBuilder.InsertData(
                table: "issued_book",
                columns: new[] { "id", "book_id", "borrower_id", "issue_date", "librarian_id", "notes", "return_before" },
                values: new object[,]
                {
                    { 10, 1, 10, new DateOnly(2024, 8, 15), 16, "First issued book", new DateOnly(2024, 9, 8) },
                    { 12, 6, 3, new DateOnly(2024, 8, 19), 16, "Second issued book", new DateOnly(2024, 9, 7) },
                    { 13, 6, 4, new DateOnly(2024, 8, 19), 16, "Third issued book", new DateOnly(2024, 8, 22) },
                    { 14, 5, 9, new DateOnly(2024, 8, 15), 16, "Fourth issued book", new DateOnly(2024, 8, 27) },
                    { 15, 24, 6, new DateOnly(2024, 8, 16), 16, "Fifth issued book", new DateOnly(2024, 8, 23) }
                });

            migrationBuilder.CreateIndex(
                name: "book_id",
                table: "issued_book",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "borrower_id",
                table: "issued_book",
                column: "borrower_id");

            migrationBuilder.CreateIndex(
                name: "librarian_id",
                table: "issued_book",
                column: "librarian_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "issued_book");

            migrationBuilder.DropTable(
                name: "book");

            migrationBuilder.DropTable(
                name: "borrower");

            migrationBuilder.DropTable(
                name: "librarian");
        }
    }
}
