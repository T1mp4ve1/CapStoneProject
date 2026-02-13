using backend.Data;
using backend.Model;
using backend.Model.DTO.Common;
using backend.Model.DTO.OpinionDTO;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class OpinionService
    {
        private readonly AppDbContext _db;
        public OpinionService(AppDbContext db)
        {
            _db = db;
        }

        // C
        public async Task<RequestResult_DTO> CreateAsync(string userId, Opinion_Create dto)
        {
            var newOpinion = new Opinion
            {
                UserId = userId,
                Rating = dto.Rating,
                UserOpinion = dto.UserOpinion
            };

            _db.Opinions.Add(newOpinion);
            await _db.SaveChangesAsync();

            return new RequestResult_DTO
            {
                Success = true,
                Data = newOpinion
            };
        }

        // R
        public async Task<RequestResult_DTO> GetAllAsync()
        {
            var opinions = await _db.Opinions
                .Include(o => o.User)
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new Opinion_Read
                {
                    Id = o.Id,
                    CreatedAt = o.CreatedAt,
                    Rating = o.Rating,
                    UserOpinion = o.UserOpinion,
                    UserId = o.UserId,
                    userFirstName = o.User.FirstName,
                    userEmail = o.User.Email
                })
                .ToListAsync();

            return new RequestResult_DTO { Success = true, Data = opinions };
        }

        public async Task<RequestResult_DTO> GetByUserAsync(string userId)
        {
            var list = await _db.Opinions
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new Opinion_Read
                {
                    Id = o.Id,
                    CreatedAt = o.CreatedAt,
                    Rating = o.Rating,
                    UserOpinion = o.UserOpinion,
                    UserId = o.UserId,
                    userFirstName = o.User.FirstName
                })
                .ToListAsync();

            return new RequestResult_DTO { Success = true, Data = list };
        }

        // U
        public async Task<RequestResult_DTO> UpdateAsync(Guid id, string userId, Opinion_Update dto)
        {
            var opinion = await _db.Opinions.FirstOrDefaultAsync(o => o.Id == id);

            if (opinion == null)
                return new RequestResult_DTO { Success = false, Error = "NotFound" };

            if (opinion.UserId != userId)
                return new RequestResult_DTO { Success = false, Error = "Unauthorized" };

            if (dto.Rating.HasValue)
                opinion.Rating = dto.Rating.Value;

            if (!string.IsNullOrWhiteSpace(dto.UserOpinion))
                opinion.UserOpinion = dto.UserOpinion;

            await _db.SaveChangesAsync();

            return new RequestResult_DTO { Success = true, Data = opinion };
        }

        // D
        public async Task<RequestResult_DTO> DeleteAsync(Guid id, string userId)
        {
            var opinion = await _db.Opinions.FirstOrDefaultAsync(o => o.Id == id);

            if (opinion == null)
                return new RequestResult_DTO { Success = false, Error = "NotFound" };

            if (opinion.UserId != userId)
                return new RequestResult_DTO { Success = false, Error = "Unauthorized" };

            _db.Opinions.Remove(opinion);
            await _db.SaveChangesAsync();

            return new RequestResult_DTO { Success = true, Data = new { opinion.Id } };
        }

    }
}
