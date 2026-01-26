using backend.Model.DTO.AppUserDTO;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
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
        [AllowAnonymous]
        public async Task<IActionResult> Registration(AppUser_Create dto)
        {
            try
            {
                var result = await _service.CreateAsync(dto);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
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
        [Authorize(Roles = "Admin")]
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