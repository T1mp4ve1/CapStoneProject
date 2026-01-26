using backend.Data;
using backend.Model;
using backend.Model.DTO.AppUserDTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

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

            var errors = new List<IdentityError>();

            if (string.IsNullOrWhiteSpace(dto.Email))
            {
                errors.Add(new IdentityError
                {
                    Code = "EmailRequired",
                    Description = "Insert your email"
                });
            }

            if (!new EmailAddressAttribute().IsValid(dto.Email))
            {
                errors.Add(new IdentityError
                {
                    Code = "InvalidEmail",
                    Description = "Email format is not valid"
                });
            }

            var existing = await _userManager.FindByEmailAsync(dto.Email);
            if (existing != null)
            {
                errors.Add(new IdentityError
                {
                    Code = "DuplicateEmail",
                    Description = "Email already exist"
                });
            }

            if (string.IsNullOrWhiteSpace(dto.Password))
            {
                errors.Add(new IdentityError
                {
                    Code = "PasswordRequired",
                    Description = "Insert your password"
                });
            }

            if (string.IsNullOrWhiteSpace(dto.FirstName))
            {
                errors.Add(new IdentityError
                {
                    Code = "FirstNameRequired",
                    Description = "Insert your name"
                });
            }

            if (errors.Any())
            {
                return IdentityResult.Failed(errors.ToArray());
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
