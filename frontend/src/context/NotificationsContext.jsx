import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { AuthContext } from "./AuthContext";

export const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const { token, isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (!isLogged || !token) return;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        "https://chitart-encwbed2fygxddb7.westeurope-01.azurewebsites.net/hubs/notifications",
        {
          accessTokenFactory: () => token,
          transport: signalR.HttpTransportType.WebSockets,
        },
      )
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("SignalR connected");
      })
      .catch((err) => console.error("SignalR error:", err));

    connection.onclose((err) => {
      console.log("SignalR closed:", err);
    });

    return () => {
      connection.stop();
    };
  }, [isLogged, token]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, markAllAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}
