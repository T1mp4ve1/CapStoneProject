using backend.Data;
using backend.Model;
using backend.Model.DTO.NotificationDTO;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class NotificationService
    {
        private readonly AppDbContext _db;
        public NotificationService(AppDbContext db)
        {
            _db = db;
        }

        //C
        public async Task<Notification> CreateAsync(Notification_Create dto)
        {
            var n = new Notification
            {
                Id = Guid.NewGuid(),
                UserId = dto.UserId,
                OrderId = dto.OrderId,
                State = dto.State,
                CreatedAt = DateTime.UtcNow,
                Read = false
            };

            _db.Notifications.Add(n);
            await _db.SaveChangesAsync();

            return n;
        }

        //R
        public async Task<List<Notification_Read>> GetUnreadAsync(string userId)
        {
            return await _db.Notifications
                .Where(n => n.UserId == userId && !n.Read)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new Notification_Read
                {
                    Id = n.Id,
                    UserId = n.UserId,
                    OrderId = n.OrderId,
                    State = n.State,
                    CreatedAt = n.CreatedAt,
                    Read = n.Read
                })
                .ToListAsync();
        }

        //U
        public async Task MarkAllRead(string userId)
        {
            var notifications = await _db.Notifications
                .Where(n => n.UserId == userId && !n.Read)
                .ToListAsync();

            foreach (var n in notifications)
                n.Read = true;

            await _db.SaveChangesAsync();
        }

        public async Task<Notification_Read?> MarkRead(string userId, Guid nId)
        {
            var exist = await _db.Notifications.FindAsync(nId);
            if (exist == null)
            {
                return null;
            }
            exist.Read = true;
            await _db.SaveChangesAsync();
            return new Notification_Read
            {
                Id = exist.Id,
                UserId = exist.UserId,
                OrderId = exist.OrderId,
                State = exist.State,
                CreatedAt = exist.CreatedAt,
                Read = exist.Read
            };


        }
    }
}
