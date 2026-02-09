using backend.Model;
using backend.Model.DTO.TicketDTO;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly TicketService _service;
        public TicketController(TicketService service) { _service = service; }

        //C
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(Ticket_Create dto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var res = await _service.CreateAsync(userId, dto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //R
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Read([FromQuery] TicketState? state)
        {
            try
            {
                var res = await _service.GetAllAsync(state);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> ReadMy()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var res = await _service.GetByUserIdAsync(userId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //U
        [HttpPut("{id}/update")]
        [Authorize]
        public async Task<IActionResult> Update(Guid id, Ticket_Update dto)
        {
            try
            {
                var res = await _service.UpdateAsync(id, dto);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}/update_state")]
        [Authorize]
        public async Task<IActionResult> UpdateState(Guid id, TicketState_Update newState)
        {
            try
            {
                var res = await _service.UpdateStateAsync(id, newState);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //D
        [HttpDelete("{id}/delete")]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var res = await _service.DeleteAsync(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}