using backend.Data;
using backend.Model;
using backend.Model.DTO.Common;
using backend.Model.DTO.GuitarCategoryDTO;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class GuitarCategoryService
    {
        private readonly AppDbContext _db;
        public GuitarCategoryService(AppDbContext db) { _db = db; }

        //C
        public async Task<bool> CreateAsync(GuitarCategory_Create dto)
        {
            var entity = new GuitarCategory
            {
                CategoryName = dto.CategoryName
            };

            _db.GuitarCategories.Add(entity);
            var result = await _db.SaveChangesAsync();

            return result > 0;
        }

        //R
        public async Task<List<GuitarCategory_Read>> GetAllAsync()
        {
            return await _db.GuitarCategories
                .AsNoTracking()
                .Select(c => new GuitarCategory_Read
                {
                    Id = c.Id,
                    CategoryName = c.CategoryName
                })
                .ToListAsync();
        }

        //U
        public async Task<RequestResult_DTO> UpdateAsync(GuitarCategory_Update dto, int id)
        {
            var exist = await _db.GuitarCategories.FindAsync(id);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }
            exist.CategoryName = dto.CategoryName;
            var result = await _db.SaveChangesAsync();
            if (result == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }
            return new RequestResult_DTO { Success = true };
        }

        //D
        public async Task<RequestResult_DTO> DeleteAsync(int id)
        {
            var exist = await _db.GuitarCategories.FindAsync(id);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }
            _db.GuitarCategories.Remove(exist);
            var result = await _db.SaveChangesAsync();
            if (result == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }
            return new RequestResult_DTO { Success = true };
        }
    }
}
