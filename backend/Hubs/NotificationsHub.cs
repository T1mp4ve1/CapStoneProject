
using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class NotificationsHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            Console.WriteLine("User connected: " + Context.UserIdentifier);
            return base.OnConnectedAsync();
        }
    }
}