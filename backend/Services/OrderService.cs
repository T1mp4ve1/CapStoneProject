using backend.Data;
using backend.Hubs;
using backend.Model;
using backend.Model.DTO.Common;
using backend.Model.DTO.OrderDTO;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class OrderService
    {
        private readonly AppDbContext _db;
        private readonly IHubContext<NotificationsHub> _hub;
        public OrderService
            (
            AppDbContext db,
            IHubContext<NotificationsHub> hub
            )
        {
            _db = db;
            _hub = hub;
        }

        //C
        public async Task<RequestResult_DTO> CreateAsync(Order_Create dto, string userId)
        {
            var order = new Order
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                Address = dto.Address,
                State = OrderStates.Pending,
                Products = new List<OrderItem>(),
                UserId = userId
            };

            decimal total = 0;

            foreach (var product in dto.Products)
            {
                var productDb = await _db.Guitars.FindAsync(product.ProductId);
                order.Products.Add(new OrderItem
                {
                    Id = Guid.NewGuid(),
                    OrderId = order.Id,
                    ProductId = product.ProductId,
                    ProductName = productDb.Name,
                    Quantity = product.Quantity,
                    UnitPrice = productDb.Price
                });

                total += productDb.Price * product.Quantity;
            }

            order.Total = total;

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            var orderDto = new Order_Read
            {
                Id = order.Id,
                CreatedAt = order.CreatedAt,
                Total = order.Total,
                Address = order.Address,
                State = order.State,
                UserId = order.UserId,
                Products = order.Products.Select(p => new OrderItem_Read
                {
                    Id = p.Id,
                    OrderId = p.OrderId,
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Quantity = p.Quantity,
                    UnitPrice = p.UnitPrice
                }).ToList()
            };
            return new RequestResult_DTO { Success = true, Data = orderDto };
        }

        //R
        public async Task<RequestResult_DTO> GetAllAsync(OrderStates? state)
        {
            var query = _db.Orders
                .AsNoTracking()
                .Include(o => o.Products)
                .Include(o => o.User)
                .AsQueryable();

            if (state.HasValue)
            {
                query = query.Where(o => o.State == state.Value);
            }

            var data = await query
                .Select(o => new Order_Read
                {
                    Id = o.Id,
                    CreatedAt = o.CreatedAt,
                    Total = o.Total,
                    Address = o.Address,
                    State = o.State,
                    Products = o.Products.Select(p => new OrderItem_Read
                    {
                        Id = p.Id,
                        OrderId = p.OrderId,
                        ProductId = p.ProductId,
                        ProductName = p.ProductName,
                        Quantity = p.Quantity,
                        UnitPrice = p.UnitPrice
                    }).ToList(),
                    UserId = o.UserId
                }).ToListAsync();

            return new RequestResult_DTO { Success = true, Data = data };
        }

        public async Task<RequestResult_DTO> GetByUserAsync(string userId)
        {
            var data = await _db.Orders
                .AsNoTracking()
                .Include(o => o.Products)
                .Include(o => o.User)
                .Where(o => o.UserId == userId)
                .Select(o => new Order_Read
                {
                    Id = o.Id,
                    CreatedAt = o.CreatedAt,
                    Total = o.Total,
                    Address = o.Address,
                    State = o.State,
                    Products = o.Products.Select(p => new OrderItem_Read
                    {
                        Id = p.Id,
                        OrderId = p.OrderId,
                        ProductId = p.ProductId,
                        ProductName = p.ProductName,
                        Quantity = p.Quantity,
                        UnitPrice = p.UnitPrice
                    }).ToList(),
                    UserId = o.UserId
                }).ToListAsync();

            return new RequestResult_DTO { Success = true, Data = data };
        }

        //U
        public async Task<RequestResult_DTO> UpdateAsync(Guid id, Order_Update dto)
        {
            var exist = await _db.Orders
                .Include(o => o.Products)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }

            exist.Address = dto.Address;
            exist.State = dto.State;
            var res = await _db.SaveChangesAsync();

            var updated = new Order_Read
            {
                Id = exist.Id,
                CreatedAt = exist.CreatedAt,
                Total = exist.Total,
                Address = exist.Address,
                State = exist.State,
                Products = exist.Products
                .Select(p => new OrderItem_Read
                {
                    Id = p.Id,
                    OrderId = p.OrderId,
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Quantity = p.Quantity,
                    UnitPrice = p.UnitPrice
                }).ToList(),
                UserId = exist.UserId
            };

            if (res == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }

            return new RequestResult_DTO { Success = true, Data = updated };
        }

        public async Task<RequestResult_DTO> UpdateStateAsync(Guid id, Order_Update_State dto)
        {
            var exist = await _db.Orders
                .Include(o => o.Products)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }
            exist.State = dto.State;
            var res = await _db.SaveChangesAsync();
            await _hub.Clients.User(exist.UserId)
                .SendAsync("OrderUpdate", exist.Id, exist.State.ToString());

            var updated = new Order_Read
            {
                Id = exist.Id,
                CreatedAt = exist.CreatedAt,
                Total = exist.Total,
                Address = exist.Address,
                State = exist.State,
                Products = exist.Products
                .Select(p => new OrderItem_Read
                {
                    Id = p.Id,
                    OrderId = p.OrderId,
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Quantity = p.Quantity,
                    UnitPrice = p.UnitPrice
                }).ToList(),
                UserId = exist.UserId
            };

            if (res == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }

            return new RequestResult_DTO { Success = true, Data = updated };
        }

        //D
        public async Task<RequestResult_DTO> DeleteAsync(Guid id)
        {
            var exist = await _db.Orders
                .Include(o => o.Products)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (exist == null)
            {
                return new RequestResult_DTO { Success = false, Error = "NotFound" };
            }

            var dto = new Order_Read
            {
                Id = exist.Id,
                CreatedAt = exist.CreatedAt,
                Total = exist.Total,
                Address = exist.Address,
                State = OrderStates.Canceled,
                Products = exist.Products
                .Select(p => new OrderItem_Read
                {
                    Id = p.Id,
                    OrderId = p.OrderId,
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Quantity = p.Quantity,
                    UnitPrice = p.UnitPrice
                }).ToList(),
                UserId = exist.UserId
            };

            _db.Orders.Remove(exist);
            var res = await _db.SaveChangesAsync();
            if (res == 0)
            {
                return new RequestResult_DTO { Success = false, Error = "NoChanges" };
            }

            return new RequestResult_DTO { Success = true, Data = dto };
        }
    }
}
