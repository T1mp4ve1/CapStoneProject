using backend.Data;
using backend.Model;
using backend.Model.DTO.ImageDTO;
using Microsoft.EntityFrameworkCore;

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
        public async Task<List<Image_Read>> GetByEntityIdAsync(string id)
        {
            var images = await _db.Images
                .Where(i => i.EntityId == id)
                .Select(i => new Image_Read
                {
                    Id = i.Id,
                    Url = i.Url,
                    EntityType = i.EntityType,
                    EntityId = i.EntityId,
                    IsMain = i.IsMain
                })
                .ToListAsync();
            return images;
        }

        //U
        //D
    }
}