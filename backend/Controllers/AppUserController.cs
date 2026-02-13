using backend.Model.DTO.AppUserDTO;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private readonly AppUserService _service;
        public AppUserController(AppUserService service) { _service = service; }

        //C
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Registration(AppUser_Create dto)
        {
            try
            {
                var result = await _service.CreateAsync(dto);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors.ToArray());
                }
                return Ok(new { message = "Registration success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //LOGIN
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(Login_DTO dto)
        {
            try
            {
                var result = await _service.LoginAsync(dto);
                if (result == null)
                {
                    return BadRequest("Email or password incorrect");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //R
        [HttpGet]
        [Authorize(Roles = "Admin,Vice,Operator")]
        public async Task<IActionResult> Read()
        {
            try
            {
                var result = await _service.GetAllAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("single_user")]
        [Authorize]
        public async Task<IActionResult> ReadById()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var result = await _service.GetByIdAsync(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        //U
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Edit(AppUser_Update dto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var result = await _service.UpdateAsync(userId, dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("changeRole")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeRole(AppUser_ChangeRole dto)
        {
            try
            {
                var result = await _service.UpdateRoles(dto);
                if (!result.Success)
                {
                    return BadRequest(result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //D
        [HttpDelete("{email}")]
        [Authorize(Roles = "Admin,Vice")]
        public async Task<IActionResult> Delete(string email)
        {
            var result = await _service.DeleteAsync(email);

            if (!result.Success)
            {
                return BadRequest(result.Error);
            }

            return Ok(result);
        }

    }
}