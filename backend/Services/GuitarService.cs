using backend.Data;
using backend.Model;
using backend.Model.DTO.Common;
using backend.Model.DTO.GuitarDTO;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class GuitarService
    {
        private readonly AppDbContext _db;
        public GuitarService(AppDbContext db) { _db = db; }

        //C
        public async Task<Guitar_Read> CreateAsync(Guitar_Create dto)
        {
            var entity = new Guitar
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description,
                CategoryId = dto.CategoryId
            };

            _db.Guitars.Add(entity);
            var result = await _db.SaveChangesAsync();

            await _db.Entry(entity).Reference(g => g.Category).LoadAsync();

            return new Guitar_Read
            {
                Id = entity.Id,
                Name = entity.Name,
                Category = entity.Category.CategoryName,
                CategoryId = entity.CategoryId,
                Description = entity.Description
            };
        }

        //R
        public async Task<List<Guitar_Read>> GetAllAsync()
        {
            return await _db.Guitars
                .AsNoTracking()
                .Include(g => g.Category)
                .Select(g => new Guitar_Read
                {
                    Id = g.Id,
                    Name = g.Name,
                    Category = g.Category.CategoryName,
                    CategoryId = g.CategoryId,
                    Description = g.Description
                })
                .ToListAsync();
        }

        //U
        public async Task<RequestResult_DTO> UpdateAsync(Guitar_Update dto, Guid id)
        {
            var exist = await _db.Guitars.FindAsync(id);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }
            exist.Name = dto.Name;
            exist.CategoryId = dto.CategoryId;
            exist.Description = dto.Description;
            var result = await _db.SaveChangesAsync();
            if (result == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }

            await _db.Entry(exist).Reference(g => g.Category).LoadAsync();
            var modifiedEntity = new Guitar_Read
            {
                Id = exist.Id,
                Name = exist.Name,
                Category = exist.Category.CategoryName,
                CategoryId = exist.CategoryId,
                Description = exist.Description
            };

            return new RequestResult_DTO { Success = true, Data = modifiedEntity };
        }

        //D
        public async Task<RequestResult_DTO> DeleteAsync(Guid id)
        {
            var exist = await _db.Guitars.FindAsync(id);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }
            _db.Guitars.Remove(exist);
            var result = await _db.SaveChangesAsync();
            if (result == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }
            return new RequestResult_DTO { Success = true };
        }
    }
}
