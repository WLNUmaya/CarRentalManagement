using Microsoft.AspNetCore.Mvc;
using CarRental.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly UserDbContext _context;

        public BookingsController(UserDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] Booking booking)
        {
            if (booking == null)
            {
                return BadRequest("Booking data is required.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the car is already booked
            var existingBooking = await _context.Bookings
                .Where(b => b.CarId == booking.CarId && b.Status == "Approved")
                .FirstOrDefaultAsync();

            if (existingBooking != null)
            {
                return BadRequest("This car is already booked. Please choose another car.");
            }

            try
            {
                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();
                return Ok("Booking saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            try
            {
                var bookings = await _context.Bookings.ToListAsync();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("approve/{id}")]
        public async Task<IActionResult> ApproveBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            booking.Status = "Approved";

            // Create a notification
            var notification = new Notifications
            {
                Message = $"Booking {id} has been approved.",
                DateCreated = DateTime.UtcNow
            };
            _context.Notifications.Add(notification);

            await _context.SaveChangesAsync();

            return Ok("Booking approved.");
        }

        [HttpPost("reject/{id}")]
        public async Task<IActionResult> RejectBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            booking.Status = "Rejected";
            await _context.SaveChangesAsync();

            return Ok("Booking rejected.");
        }
       
        // New: Delete Booking Endpoint
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return Ok($"Booking {id} deleted successfully.");
        }
    }
}