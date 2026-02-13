using backend.Model.DTO.OpinionDTO;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpinionController : ControllerBase
    {
        private readonly OpinionService _service;
        public OpinionController(OpinionService service)
        {
            _service = service;
        }

        // C
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(Opinion_Create dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _service.CreateAsync(userId, dto);
            return Ok(result);
        }

        // R
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMine()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _service.GetByUserAsync(userId);
            return Ok(result);
        }

        // U
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(Guid id, Opinion_Update dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _service.UpdateAsync(id, userId, dto);
            return Ok(result);
        }

        // D
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _service.DeleteAsync(id, userId);
            return Ok(result);
        }

    }
}
