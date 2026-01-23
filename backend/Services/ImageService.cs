using backend.Data;
using backend.Model;
using backend.Model.DTO.ImageDTO;

namespace backend.Services
{
    public class ImageService
    {
        private readonly AppDbContext _db;
        public ImageService(AppDbContext db) { _db = db; }

        //C
        public async Task<bool> CreateAsync(Image_Create dto)
        {
            var newImage = new Image
            {
                Id = Guid.NewGuid(),
                Url = dto.Url,
                EntityType = dto.EntityType,
                EntityId = dto.EntityId,
                IsMain = dto.IsMain
            };

            _db.Images.Add(newImage);
            var result = await _db.SaveChangesAsync();
            return result > 0;
        }

        //R
        //U
        //D
    }
}