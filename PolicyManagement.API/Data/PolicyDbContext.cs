using Microsoft.EntityFrameworkCore;
using PolicyManagement.API.Data.Entities;

namespace PolicyManagement.API.Data;

public class PolicyDbContext : DbContext
{
    public PolicyDbContext(DbContextOptions<PolicyDbContext> options)
        : base(options) { }

    public DbSet<Policy> Policies => Set<Policy>();
    public DbSet<PolicyType> PolicyTypes => Set<PolicyType>();


//--seeding data for policy type--//
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PolicyType>().HasData(
            new PolicyType
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Name = "Health"
            },
            new PolicyType
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Name = "Life"
            },
            new PolicyType
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Name = "Auto"
            }
        );
    }
}
