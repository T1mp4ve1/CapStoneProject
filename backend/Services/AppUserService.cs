using backend.Data;
using backend.Model;
using backend.Model.DTO.AppUserDTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AppUserService
    {
        private readonly AppDbContext _db;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        public AppUserService
            (
            AppDbContext db,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            TokenService tokenService
            )
        {
            _db = db;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        //C
        public async Task<IdentityResult> CreateAsync(AppUser_Create dto)
        {
            var existing = await _userManager.FindByEmailAsync(dto.Email);
            if (existing != null)
            {
                return IdentityResult.Failed(new IdentityError
                {
                    Description = "Email already exist"
                });
            }

            var newUser = new AppUser
            {
                CreatedAt = DateTime.UtcNow,
                UserName = dto.Email,
                Email = dto.Email,
                FirstName = dto.FirstName,
                EmailConfirmed = false,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = true
            };

            var result = await _userManager.CreateAsync(newUser, dto.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, "User");
            }
            return result;
        }

        //LOGIN
        public async Task<Login_Response?> LoginAsync(Login_DTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, lockoutOnFailure: true);
            if (!result.Succeeded)
            {
                return null;
            }

            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.CreateToken(user, roles);

            var newLoginRes = new Login_Response
            {
                Token = token,
                Email = user.Email,
                Roles = roles
            };

            return newLoginRes;
        }

        //R
        public async Task<List<AppUser_Read>> GetAllAsync()
        {
            return await _userManager.Users
                .AsNoTracking()
                .Select(u => new AppUser_Read
                {
                    Id = u.Id,
                    Email = u.Email,
                    EmailConfirmed = u.EmailConfirmed,
                    UserName = u.UserName,
                    FirstName = u.FirstName,
                    CreatedAt = u.CreatedAt,
                    PhoneNumber = u.PhoneNumber,
                    PhoneNumberConfirmed = u.PhoneNumberConfirmed,
                    TwoFactorEnabled = u.TwoFactorEnabled,
                    AccessFailedCount = u.AccessFailedCount
                }).ToListAsync();
        }

        //U

        //D
    }
}
