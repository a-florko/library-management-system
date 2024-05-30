using System;
using System.Collections.Generic;
using LibraryManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace LibraryManagementAPI.Data;

public partial class LibraryDbContext : DbContext
{
    public LibraryDbContext()
    {
    }

    public LibraryDbContext(DbContextOptions<LibraryDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("book");

            entity.Property(e => e.Author).HasMaxLength(100);
            entity.Property(e => e.CopiesInStock).HasColumnName("Copies_in_stock");
            entity.Property(e => e.Language).HasMaxLength(50);
            entity.Property(e => e.Overview).HasMaxLength(1800);
            entity.Property(e => e.Title).HasMaxLength(100);
            entity.Property(e => e.TotalCopies).HasColumnName("Total_copies");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
