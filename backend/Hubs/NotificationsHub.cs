using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class NotificationsHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            Console.WriteLine("CLAIMS:");
            foreach (var c in Context.User.Claims)
                Console.WriteLine($"{c.Type} = {c.Value}");

            Console.WriteLine("USER CONNECTED: " + Context.UserIdentifier);
            return base.OnConnectedAsync();
        }

        public async Task DebugPing(string message)
        {
            Console.WriteLine("PING RECEIVED FROM CLIENT: " + message);
            await Clients.Caller.SendAsync("OrderUpdate", "DEBUG_ORDER", "DEBUG_STATE");
        }
    }
}