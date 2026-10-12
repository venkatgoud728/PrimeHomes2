using Microsoft.EntityFrameworkCore;
using PrimeHomes.API.Models;

namespace PrimeHomes.API.Data
{
    public class PrimeHomesDbContext : DbContext
    {
        public PrimeHomesDbContext(DbContextOptions<PrimeHomesDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Property> Properties { get; set; }

        public DbSet<ContactRequest> ContactRequests { get; set; }

        public DbSet<PropertyImage> PropertyImages { get; set; }

        public DbSet<Inquiry> Inquiries { get; set; }

        public DbSet<Favorite> Favorites { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }

        public DbSet<Notification> Notifications { get; set; }


    }
}