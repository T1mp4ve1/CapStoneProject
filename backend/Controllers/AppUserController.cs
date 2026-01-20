using backend.Model.DTO.AppUserDTO;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> Registration(AppUser_Create dto)
        {
            try
            {
                var result = await _service.CreateAsync(dto);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
                return Ok("Registration success");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //LOGIN
        // user@example.com Guitar2025@
        [HttpPost("login")]
        public async Task<IActionResult> Login(Login_DTO dto)
        {
            try
            {
                var result = await _service.LoginAsync(dto);
                if (result.IsLockedOut)
                {
                    return BadRequest("Account locked due to too many failed attempts");
                }
                if (result.IsNotAllowed)
                {
                    return BadRequest("Email not confirmed");
                }
                if (!result.Succeeded)
                {
                    return BadRequest("Email or password is incorrect");
                }
                return Ok("Login success");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //R
        [HttpGet]
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

        //U

        //D
    }
}