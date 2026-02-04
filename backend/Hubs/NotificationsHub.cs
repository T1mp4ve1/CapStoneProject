using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class NotificationsHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ConnectionReady", Context.ConnectionId);
            await base.OnConnectedAsync();
        }
    }
}