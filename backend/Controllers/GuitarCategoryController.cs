using backend.Model.DTO.GuitarCategoryDTO;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuitarCategoryController : ControllerBase
    {
        private readonly GuitarCategoryService _service;

        public GuitarCategoryController(GuitarCategoryService service)
        {
            _service = service;
        }

        //C
        [HttpPost]
        [Authorize(Roles = "Admin,Vice")]
        public async Task<IActionResult> Create(GuitarCategory_Create dto)
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

        //U
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Vice")]
        public async Task<IActionResult> Update(GuitarCategory_Update dto, int id)
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

                return Ok("Successfully updated");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //D
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Vice")]
        public async Task<IActionResult> Delete(int id)
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
