using backend.Data;
using backend.Model;
using backend.Model.DTO.Common;
using backend.Model.DTO.TicketDTO;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TicketService
    {
        private readonly AppDbContext _db;
        public TicketService(AppDbContext db) { _db = db; }

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
        public async Task<RequestResult_DTO> GetAllAsync()
        {
            var tickets = await _db.Tickets
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
                .OrderBy(t => t.CreatedAt)
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
