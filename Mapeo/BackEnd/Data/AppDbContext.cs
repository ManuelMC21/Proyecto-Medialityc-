using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Restaurant> Restaurants => Set<Restaurant>();
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=Medialityc;User Id=postgres;Password=manu04",
            o => o.UseNetTopologySuite());
    }

    protected override void OnModelCreating(ModelBuilder mb)
    {

        mb.Entity<Restaurant>(entity =>
        {
            entity.Property(r => r.location).HasColumnType("geometry(Point, 4326)");
        });
    }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
}