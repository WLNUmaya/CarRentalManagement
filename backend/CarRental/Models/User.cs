// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace CarRental.Models
{
    public class User
    {
        [Key]
        public string UserId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

      
    }
}
