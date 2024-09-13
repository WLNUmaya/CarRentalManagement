using System.ComponentModel.DataAnnotations;

public class CarDetail
{
    [Key]
    public string Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Manufacturer { get; set; }

    [Required]
    public string Type { get; set; }

    [Required]
    public string Capacity { get; set; }

    [Required]
    public string PerDay { get; set; }

    [Required]
    public bool IsPopular { get; set; }

    [Required]
    public bool IsRecommended { get; set; }

    [Required]
    public string TravelType { get; set; }

    [Required]
    public string VehicleType { get; set; }

    public bool IsBooked { get; set; } = false; // Add this property
}
