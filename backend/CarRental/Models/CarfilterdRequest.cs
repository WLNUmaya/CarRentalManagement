namespace CarRental.Models
{
    public class CarFilterRequest
    {
        public string SelfDrive { get; set; }
        public string PickupLocation { get; set; }
        public DateTime? PickupDate { get; set; }
        public DateTime? PickupTime { get; set; }
        public DateTime? ReturnDate { get; set; }
        public string VehicleType { get; set; }
    }
}