using CarRental.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CarDetailController : ControllerBase
{
    private readonly UserDbContext _context;

    public CarDetailController(UserDbContext context)
    {
        _context = context;
    }

    // GET: api/CarDetail
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CarDetail>>> GetCarDetails()
    {
        return await _context.CarDetails.ToListAsync();
    }

    // GET: api/CarDetail/5
    [HttpGet("{id}")]
    public async Task<ActionResult<CarDetail>> GetCarDetail(string id)
    {
        var carDetail = await _context.CarDetails.FindAsync(id);

        if (carDetail == null)
        {
            return NotFound();
        }

        return carDetail;
    }

    // POST: api/CarDetail
    [HttpPost]
    public async Task<ActionResult<CarDetail>> PostCarDetail([FromBody] CarDetail carDetail)
    {
        if (carDetail == null)
        {
            return BadRequest("Car detail is null.");
        }

        // Check if the car detail with the same ID already exists
        if (await _context.CarDetails.AnyAsync(cd => cd.Id == carDetail.Id))
        {
            return Conflict("A car detail with this ID already exists.");
        }

        _context.CarDetails.Add(carDetail);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCarDetail), new { id = carDetail.Id }, carDetail);
    }

    // PUT: api/CarDetail/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCarDetail(string id, [FromBody] CarDetail carDetail)
    {
        if (id != carDetail.Id)
        {
            return BadRequest("ID mismatch.");
        }

        _context.Entry(carDetail).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CarDetailExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/CarDetail/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCarDetail(string id)
    {
        var carDetail = await _context.CarDetails.FindAsync(id);
        if (carDetail == null)
        {
            return NotFound();
        }

        _context.CarDetails.Remove(carDetail);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    [HttpPut("update-booking-status/{id}")]
    public async Task<IActionResult> UpdateBookingStatus(string id, [FromBody] UpdateBookingStatusRequest request)
    {
        var carDetail = await _context.CarDetails.FindAsync(id);
        if (carDetail == null)
        {
            return NotFound();
        }

        carDetail.IsBooked = request.IsBooked;
        _context.Entry(carDetail).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CarDetailExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpPut("mark-available/{id}")]
    public async Task<IActionResult> MarkCarAsAvailable(string id)
    {
        var carDetail = await _context.CarDetails.FindAsync(id);
        if (carDetail == null)
        {
            return NotFound();
        }

        carDetail.IsBooked = false;
        _context.Entry(carDetail).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CarDetailExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }


    private bool CarDetailExists(string id)
    {
        return _context.CarDetails.Any(e => e.Id == id);
    }
}