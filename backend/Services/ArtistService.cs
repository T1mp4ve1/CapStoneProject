using backend.Data;
using backend.Model;
using backend.Model.DTO.ArtistDTO;
using backend.Model.DTO.Common;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ArtistService
    {
        private readonly AppDbContext _db;
        public ArtistService(AppDbContext db) { _db = db; }

        //C
        public async Task<Artist> CreateAsync(Artist_Create dto)
        {
            var entity = new Artist
            {
                Name = dto.Name,
                Img = dto.Img,
                About = dto.About
            };

            _db.Artists.Add(entity);
            var result = await _db.SaveChangesAsync();

            return entity;
        }

        //R
        public async Task<List<Artist_Read>> GetAllAsync()
        {
            return await _db.Artists
                .AsNoTracking()
                .Select(a => new Artist_Read
                {
                    Id = a.Id,
                    Name = a.Name,
                    Img = a.Img,
                    About = a.About
                })
                .ToListAsync();
        }

        //U
        public async Task<RequestResult_DTO> UpdateAsync(Artist_Update dto, int id)
        {
            var exist = await _db.Artists.FindAsync(id);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }
            exist.Name = dto.Name;
            exist.Img = dto.Img;
            exist.About = dto.About;
            var result = await _db.SaveChangesAsync();
            if (result == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }
            return new RequestResult_DTO { Success = true, Data = exist };
        }

        //D
        public async Task<RequestResult_DTO> DeleteAsync(int id)
        {
            var exist = await _db.Artists.FindAsync(id);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }
            _db.Artists.Remove(exist);
            var result = await _db.SaveChangesAsync();
            if (result == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }
            return new RequestResult_DTO { Success = true };
        }
    }
}
