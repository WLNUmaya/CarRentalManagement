using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CarRental.Models;

namespace CarRental.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly UserDbContext _context;

        public NotificationsController(UserDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notifications>>> GetNotifications()
        {
            return Ok(await _context.Notifications.Where(n => !n.IsRead).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] Notifications notification)
        {
            if (notification == null)
            {
                return BadRequest("Notification data is required.");
            }

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return Ok("Notification created successfully.");
        }

       
        
    }
}
