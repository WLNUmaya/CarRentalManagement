using CarRental.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;


namespace CarRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserDbContext _context;

        public AuthController(UserDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var token = await _userService.Authenticate(model.Username, model.Password);
            if (token == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var user = await _userService.Register(model);
            if (user == null)
                return BadRequest(new { message = "Error creating user" });

            return Ok(user);
        }

        

        public class PasswordValidationResult
        {
            public bool IsValid { get; set; }
            public string ErrorMessage { get; set; }
        }

        [HttpPost]
        [Route("validateinputs")]
        public async Task<PasswordValidationResult> ValidatePassword([FromBody] PasswordValidationRequest request)
        {
            var result = new PasswordValidationResult();

            // Check if any field is empty
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password) ||
                string.IsNullOrWhiteSpace(request.ConfirmPassword))
            {
                result.IsValid = false;
                result.ErrorMessage = "All fields are required.";
                return result;
            }

            // Check if the username exists
            var userExists = await _context.Users.AsNoTracking()
                                      .AnyAsync(u => EF.Functions.Collate(u.Username, "Latin1_General_BIN") == request.Username);
            if (userExists)
            {
                result.IsValid = false;
                result.ErrorMessage = "Username already exist.";
                return result;
            }

            if (request.Password != request.ConfirmPassword)
            {
                result.IsValid = false;
                result.ErrorMessage = "Passwords do not match.";
                return result;
            }

            if (string.IsNullOrWhiteSpace(request.Password) || request.Password.Length < 7)
            {
                result.IsValid = false;
                result.ErrorMessage = "Password must be at least 7 characters long.";
                return result;
            }

            bool hasUpperCase = request.Password.Any(char.IsUpper);
            bool hasLowerCase = request.Password.Any(char.IsLower);
            bool hasDigit = request.Password.Any(char.IsDigit);
            bool hasSpecialChar = request.Password.Any(ch => !char.IsLetterOrDigit(ch));

            if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar)
            {
                result.IsValid = false;
                result.ErrorMessage = "Password must contain upper and lower case letters, digits, and special characters.";
                return result;
            }



            result.IsValid = true;
            return result;
        }

        public class PasswordValidationRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string ConfirmPassword { get; set; }


        }
    }
}
