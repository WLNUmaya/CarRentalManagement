using System;
using System.Globalization;
using System.ComponentModel.DataAnnotations;

namespace CarRental.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string TownCity { get; set; }

        [Required]
        public string PickupLocation { get; set; }

        [Required]
        public DateTime PickupDate { get; set; }

        [Required]
        public string PickupTime { get; set; } // Store as string initially, will be converted later

        [Required]
        public string DropoffLocation { get; set; }

        [Required]
        public DateTime DropoffDate { get; set; }

        [Required]
        public string DropoffTime { get; set; } // Store as string initially, will be converted later

        [Required]
        public string CarId { get; set; }

        public string CarName { get; set; }
        public string CarManufacturer { get; set; }
        public string CarType { get; set; }
        public string CarCapacity { get; set; }
        public string CarPerDay { get; set; }

        public string Status { get; set; } = "Pending"; // Default status

        public TimeSpan ConvertToTimeSpan(string time)
        {
            return DateTime.ParseExact(time, "h:mm tt", CultureInfo.InvariantCulture).TimeOfDay;
        }
    }
}
