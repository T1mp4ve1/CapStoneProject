using backend.Model.DTO.ArtistDTO;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly ArtistService _service;

        public ArtistController(ArtistService service)
        {
            _service = service;
        }

        //C
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(Artist_Create dto)
        {
            try
            {
                var result = await _service.CreateAsync(dto);
                if (!result)
                {
                    return BadRequest("Something went wrong");
                }
                return Ok("Successfully created");
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
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Artist_Update dto, int id)
        {
            try
            {
                var result = await _service.UpdateAsync(dto, id);
                if (!result.Success)
                {
                    if (result.Error == "NotFound")
                    {
                        return NotFound("Artist not found");
                    }
                    if (result.Error == "NoChanges")
                    {
                        return BadRequest("No changes were applied");
                    }
                }

                return Ok("Successfully updated");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //D
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _service.DeleteAsync(id);
                if (!result.Success)
                {
                    if (result.Error == "NotFound")
                    {
                        return NotFound("Artist not found");
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
