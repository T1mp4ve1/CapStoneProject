using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotificationController : ControllerBase
    {
        private readonly NotificationService _service;
        public NotificationController(NotificationService service)
        {
            _service = service;
        }

        private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);

        //R
        [HttpGet("unread")]
        public async Task<IActionResult> GetUnread()
        {
            try
            {
                var data = await _service.GetUnreadAsync(UserId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        //U
        [HttpPost("mark_all_read")]
        public async Task<IActionResult> MarkAllRead()
        {
            try
            {
                await _service.MarkAllRead(UserId);
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("mark_read/{id}")]
        public async Task<IActionResult> MarkRead(Guid id)
        {
            try
            {
                var result = await _service.MarkRead(UserId, id);
                if (result == null)
                {
                    return NotFound(new { success = false, error = "NotFound" });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

    }
}
