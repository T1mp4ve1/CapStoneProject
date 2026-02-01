using backend.Data;
using backend.Model;
using backend.Model.DTO.Common;
using backend.Model.DTO.OrderDTO;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class OrderService
    {
        private readonly AppDbContext _db;
        public OrderService(AppDbContext db) { _db = db; }

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
        public async Task<RequestResult_DTO> GetAllAsync()
        {
            var data = await _db.Orders
                .AsNoTracking()
                .Include(o => o.User)
                .Include(o => o.Products)
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

        //D
    }
}
