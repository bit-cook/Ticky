namespace Ticky.Internal.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Column> Columns { get; set; } = default!;
        public DbSet<Card> Cards { get; set; } = default!;

        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<Column>()
                .HasMany(x => x.Cards)
                .WithOne(x => x.Column)
                .HasForeignKey(x => x.ColumnId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
