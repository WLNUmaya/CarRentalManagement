using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CarRental.Models
{
    // Models/Notification.cs
    public class Notifications
    {
        [Key]
        public int Id { get; set; }

       

        public string Message { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsRead { get; set; } = false;
    }

}