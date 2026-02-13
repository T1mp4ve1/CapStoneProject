using backend.Data;
using backend.Hubs;
using backend.Model;
using backend.Model.DTO.Common;
using backend.Model.DTO.TicketDTO;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TicketService
    {
        private readonly AppDbContext _db;
        private readonly IHubContext<NotificationsHub> _hub;
        public TicketService(AppDbContext db, IHubContext<NotificationsHub> hub)
        { _db = db; _hub = hub; }

        //C
        public async Task<RequestResult_DTO> CreateAsync(string userId, Ticket_Create dto)
        {
            var ticket = new Ticket
            {
                State = TicketState.Opened,
                UserId = userId,
                Problem = dto.Problem
            };
            _db.Tickets.Add(ticket);
            await _db.SaveChangesAsync();

            var admins_vices = await _db.UserRoles
                .Join(_db.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => new { ur.UserId, RoleName = r.Name })
                .Where(x => x.RoleName == "Admin" || x.RoleName == "Vice")
                .Select(x => x.UserId)
                .ToListAsync();

            foreach (var avId in admins_vices)
            {
                var n = new Notification
                {
                    Id = Guid.NewGuid(),
                    UserId = avId,
                    OrderId = ticket.Id,
                    State = "New Ticket",
                    CreatedAt = DateTime.UtcNow,
                    Read = false
                };
                _db.Notifications.Add(n);

                await _hub.Clients.User(avId)
                .SendAsync("New ticket", ticket.Id, "New Ticket");
            }
            await _db.SaveChangesAsync();


            var newTicket = new Ticket_Read
            {
                Id = ticket.Id,
                CreatedAt = ticket.CreatedAt,
                State = ticket.State,
                UserId = ticket.UserId,
                Problem = ticket.Problem
            };

            return new RequestResult_DTO { Success = true, Data = newTicket };
        }

        //R
        public async Task<RequestResult_DTO> GetAllAsync(TicketState? state)
        {
            var query = _db.Tickets
                .AsNoTracking()
                .AsQueryable();

            if (state.HasValue)
            {
                query = query.Where(t => t.State == state);
            }

            var tickets = await query
                .OrderBy(t => t.State)
                .ThenByDescending(t => t.CreatedAt)
                .Select(t => new Ticket_Read
                {
                    Id = t.Id,
                    CreatedAt = t.CreatedAt,
                    State = t.State,
                    UserId = t.UserId,
                    Problem = t.Problem
                })
                .ToListAsync();

            return new RequestResult_DTO { Success = true, Data = tickets };
        }

        public async Task<RequestResult_DTO> GetByUserIdAsync(string userId)
        {
            var tickets = await _db.Tickets
                .Where(t => t.UserId == userId)
                .OrderBy(t => t.State)
                .ThenByDescending(t => t.CreatedAt)
                .Select(t => new Ticket_Read
                {
                    Id = t.Id,
                    CreatedAt = t.CreatedAt,
                    State = t.State,
                    UserId = t.UserId,
                    Problem = t.Problem
                })
                .ToListAsync();

            return new RequestResult_DTO { Success = true, Data = tickets };
        }

        //U
        public async Task<RequestResult_DTO> UpdateAsync(Guid id, Ticket_Update dto)
        {
            var exist = await _db.Tickets.FindAsync(id);
            exist.Problem = dto.Problem;
            await _db.SaveChangesAsync();

            var edited = new Ticket_Read
            {
                Id = exist.Id,
                CreatedAt = exist.CreatedAt,
                State = exist.State,
                UserId = exist.UserId,
                Problem = exist.Problem
            };

            return new RequestResult_DTO { Success = true, Data = edited };
        }

        public async Task<RequestResult_DTO> UpdateStateAsync(Guid id, TicketState_Update newState)
        {
            var exist = await _db.Tickets.FindAsync(id);
            exist.State = newState.State;
            await _db.SaveChangesAsync();

            var edited = new Ticket_Read
            {
                Id = exist.Id,
                CreatedAt = exist.CreatedAt,
                State = exist.State,
                UserId = exist.UserId,
                Problem = exist.Problem
            };

            return new RequestResult_DTO { Success = true, Data = edited };
        }

        //D
        public async Task<RequestResult_DTO> DeleteAsync(Guid id)
        {
            var exist = await _db.Tickets.FindAsync(id);
            _db.Tickets.Remove(exist);
            await _db.SaveChangesAsync();

            var edited = new Ticket_Read
            {
                Id = exist.Id,
                CreatedAt = exist.CreatedAt,
                State = exist.State,
                UserId = exist.UserId,
                Problem = exist.Problem
            };

            return new RequestResult_DTO { Success = true, Data = edited };
        }
    }
}
