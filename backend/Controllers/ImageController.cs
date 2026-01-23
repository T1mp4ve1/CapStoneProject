using backend.Model;
using backend.Model.DTO.ImageDTO;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ImageService _imageService;
        private readonly BlobService _blobService;
        public ImageController(ImageService imageService, BlobService blobService)
        {
            _imageService = imageService;
            _blobService = blobService;
        }

        //C
        [HttpPost("upload")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Upload(
            IFormFile file,
            [FromForm] ImageTypes entityType,
            [FromForm] string? entityId,
            [FromForm] bool isMain
            )
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("File is empty");
                }

                var url = await _blobService.UploadAsync(file);
                var dto = new Image_Create
                {
                    Url = url,
                    EntityType = entityType,
                    EntityId = entityId,
                    IsMain = isMain
                };

                var result = await _imageService.CreateAsync(dto);
                if (!result)
                {
                    return BadRequest("Something went wrong");
                }
                return Ok(new
                {
                    message = "Image upload successfully",
                    url,
                    entityType,
                    entityId,
                    isMain
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //R
        //U
        //D
    }
}
