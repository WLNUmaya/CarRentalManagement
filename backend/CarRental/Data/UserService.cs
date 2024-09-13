using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarRental.Data;
using CarRental.Models;
using Microsoft.AspNetCore.Identity;
using System;

public interface IUserService
{
    Task<string> Authenticate(string username, string password);
    Task<User> Register(RegisterModel registerModel);
}

public class UserService : IUserService
{
    private readonly UserDbContext _context;
    private readonly AppSettings _appSettings;

    public UserService(UserDbContext context, IOptions<AppSettings> appSettings)
    {
        _context = context;
        _appSettings = appSettings.Value;
    }

    public async Task<string> Authenticate(string username, string password)
    {
        var user = await _context.Users.SingleOrDefaultAsync(x => x.Username == username && x.Password == password);
        if (user == null) return null;

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {
                new Claim("id", user.UserId),
              
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<User> Register(RegisterModel registerModel)
    {
        string userId = GetNextUserID();
      
        var user = new User
        {
            UserId = userId,
            Username = registerModel.Username,
            Email = registerModel.Email,
            Password = registerModel.Password,
           
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public string GetNextUserID()
    {
        var lastUser = _context.Users.OrderByDescending(u => u.UserId).FirstOrDefault();
        string nextUserId;

        if (lastUser == null)
        {
            nextUserId = "U001";
        }
        else
        {
            string lastUserId = lastUser.UserId;
            int numericPart = int.Parse(lastUserId.Substring(1));
            numericPart++;
            nextUserId = "U" + numericPart.ToString("D3");
        }

        return nextUserId;

    }
}

