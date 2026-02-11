using backend.Model.DTO.GuitarDTO;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuitarController : ControllerBase
    {
        private readonly GuitarService _service;

        public GuitarController(GuitarService service)
        {
            _service = service;
        }

        //C
        [HttpPost]
        public async Task<IActionResult> Create(Guitar_Create dto)
        {
            try
            {
                var result = await _service.CreateAsync(dto);
                if (result == null)
                {
                    return BadRequest("Something went wrong");
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
        [AllowAnonymous]
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

        [HttpGet("{id}")]
        public async Task<IActionResult> ReadId(Guid id)
        {
            try
            {
                var result = await _service.GetByIdAsync(id);
                if (!result.Success)
                {
                    return NotFound(result);
                }
                return Ok(result.Data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //U
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Guitar_Update dto, Guid id)
        {
            try
            {
                var result = await _service.UpdateAsync(dto, id);
                if (!result.Success)
                {
                    if (result.Error == "NotFound")
                    {
                        return NotFound("Category not found");
                    }
                    if (result.Error == "NoChanges")
                    {
                        return BadRequest("No changes were applied");
                    }
                }

                return Ok(result.Data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //D
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _service.DeleteAsync(id);
                if (!result.Success)
                {
                    if (result.Error == "NotFound")
                    {
                        return NotFound("Category not found");
                    }
                    if (result.Error == "NoChanges")
                    {
                        return BadRequest("No changes were applied");
                    }
                }
                return Ok("Successfully deleted");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
