using backend.Data;
using backend.Model;
using backend.Model.DTO.AppUserDTO;
using backend.Model.DTO.Common;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Data;

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
            var users = await _userManager.Users
                .AsNoTracking()
                .ToListAsync();
            var userRoles = await _db.UserRoles.ToListAsync();
            var roles = await _db.Roles.ToListAsync();

            var result = users.Select(u => new AppUser_Read
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
                AccessFailedCount = u.AccessFailedCount,
                Roles = userRoles
                 .Where(ur => ur.UserId == u.Id)
                 .Join(roles, ur => ur.RoleId, r => r.Id, (ur, r) => r.Name).ToList()
            }).ToList();

            return result;
        }

        public async Task<RequestResult_DTO> GetByIdAsync(string userId)
        {
            var userRoles = await _db.UserRoles.ToListAsync();
            var roles = await _db.Roles.ToListAsync();
            var user = await _userManager.Users
                .Where(u => u.Id == userId)
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
                    AccessFailedCount = u.AccessFailedCount,
                    Roles = new List<string>()
                }).FirstOrDefaultAsync();

            user.Roles = await _db.UserRoles
                .Where(ur => ur.UserId == userId)
                .Join(_db.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => r.Name)
                .ToListAsync();

            return new RequestResult_DTO { Success = true, Data = user };
        }

        //U
        public async Task<RequestResult_DTO> UpdateAsync(string userId, AppUser_Update dto)
        {
            var exist = await _userManager.FindByIdAsync(userId);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }

            if (!string.IsNullOrWhiteSpace(dto.FirstName))
            {
                exist.FirstName = dto.FirstName;
            }
            if (!string.IsNullOrWhiteSpace(dto.PhoneNumber))
            {
                exist.PhoneNumber = dto.PhoneNumber;
            }
            if (!string.IsNullOrWhiteSpace(dto.Email) && dto.Email != exist.Email)
            {
                await _userManager.SetEmailAsync(exist, dto.Email);
                await _userManager.SetUserNameAsync(exist, dto.Email);
                exist.EmailConfirmed = false;
            }

            var result = await _db.SaveChangesAsync();
            if (result == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }

            var modified = new AppUser_Read
            {
                Id = exist.Id,
                Email = exist.Email,
                EmailConfirmed = exist.EmailConfirmed,
                UserName = exist.UserName,
                FirstName = exist.FirstName,
                CreatedAt = exist.CreatedAt,
                PhoneNumber = exist.PhoneNumber,
                PhoneNumberConfirmed = exist.PhoneNumberConfirmed,
                TwoFactorEnabled = exist.TwoFactorEnabled,
                AccessFailedCount = exist.AccessFailedCount
            };

            return new RequestResult_DTO { Success = true, Data = modified };
        }

        public async Task<RequestResult_DTO> UpdateRoles(AppUser_ChangeRole dto)
        {
            var user = await _userManager.FindByIdAsync(dto.UserId);
            if (user == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }
            var roleExist = await _db.Roles.AnyAsync(r => r.Name == dto.NewRole);
            if (!roleExist)
            {
                return new RequestResult_DTO { Success = false, Error = "RoleNotFound" };
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            if (currentRoles.Contains("Admin"))
            {
                return new RequestResult_DTO { Success = false, Error = "CannotModifyAdmin" };
            }
            var removeRoles = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeRoles.Succeeded)
            {
                return new RequestResult_DTO { Success = false, Error = "CannotRemoveRole" };
            }
            var addRole = await _userManager.AddToRoleAsync(user, dto.NewRole);
            if (!addRole.Succeeded)
            {
                return new RequestResult_DTO { Success = false, Error = "CannotAddRole" };
            }

            return new RequestResult_DTO { Success = true, Data = new { user.Id, currentRoles } };
        }

        public async Task<RequestResult_DTO> selfUpdateRoles(string currentUserId, AppUser_ChangeRole dto)
        {
            if (dto.UserId != currentUserId)
            {
                return new RequestResult_DTO { Success = false, Error = "Unauthorized" };
            }
            var user = await _userManager.FindByIdAsync(dto.UserId);
            if (user == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }
            if (dto.NewRole == "Admin" || dto.NewRole == "Vice")
            {
                return new RequestResult_DTO { Success = false, Error = "CannotHaveRole" };
            }
            var roleExist = await _db.Roles.AnyAsync(r => r.Name == dto.NewRole);
            if (!roleExist)
            {
                return new RequestResult_DTO { Success = false, Error = "RoleNotFound" };
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            if (currentRoles.Contains("Admin"))
            {
                return new RequestResult_DTO { Success = false, Error = "CannotModifyAdmin" };
            }

            var removeRoles = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeRoles.Succeeded)
            {
                return new RequestResult_DTO { Success = false, Error = "CannotRemoveRole" };
            }

            var addRole = await _userManager.AddToRoleAsync(user, dto.NewRole);
            if (!addRole.Succeeded)
            {
                return new RequestResult_DTO { Success = false, Error = "CannotAddRole" };
            }
            var newRoles = await _userManager.GetRolesAsync(user);

            return new RequestResult_DTO { Success = true, Data = new { user.Id, newRoles } };
        }

        //D
        public async Task<RequestResult_DTO> DeleteAsync(string email)
        {
            var exist = await _userManager.FindByEmailAsync(email);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }

            var role = await _userManager.GetRolesAsync(exist);
            if (role.Contains("Admin"))
            {
                return new RequestResult_DTO
                {
                    Success = false,
                    Error = "CannotDeleteAdmin"
                };
            }

            var result = await _userManager.DeleteAsync(exist);
            if (!result.Succeeded)
            {
                return new RequestResult_DTO
                {
                    Success = false,
                    Error = string.Join(", ", result.Errors.Select(e => e.Description))
                };
            }

            return new RequestResult_DTO { Success = true, Data = new { exist.Id, exist.Email } };
        }
    }
}
