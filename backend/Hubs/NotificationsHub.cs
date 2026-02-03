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

        public async Task DebugPing(string message)
        {
            Console.WriteLine("PING RECEIVED FROM CLIENT: " + message);
            await Clients.Caller.SendAsync("OrderUpdate", "DEBUG_ORDER", "DEBUG_STATE");
        }
    }
}