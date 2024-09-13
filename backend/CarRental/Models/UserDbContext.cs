using CarRental.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Models
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }  // Changed to plural

        public DbSet<Booking> Bookings { get; set; }

        public DbSet<CarDetail> CarDetails { get; set; }
        public DbSet <Notifications> Notifications { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
