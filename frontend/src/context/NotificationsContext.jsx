import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { AuthContext } from "./AuthContext";

export const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const api = import.meta.env.VITE_API_URL;
  const backend =
    "https://chitart-encwbed2fygxddb7.westeurope-01.azurewebsites.net";
  const [notifications, setNotifications] = useState([]);
  const { token, isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (!isLogged || !token) return;
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${api}/Notification/unread`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetch notification:", err);
      }
    };
    fetchNotifications();
  }, [isLogged, token]);

  // SignalR
  useEffect(() => {
    if (!isLogged || !token) return;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${backend}/hubs/notifications?access_token=` + token, {
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    connection.on("OrderUpdate", (orderId, newState) => {
      setNotifications((prev) => [
        {
          id: crypto.randomUUID(),
          orderId,
          state: newState,
          createdAt: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
    });

    connection.start().catch((err) => console.error("SignalR error:", err));

    return () => {
      connection.stop();
    };
  }, [isLogged, token]);

  const markAllAsRead = async () => {
    try {
      await fetch(`${api}/Notification/mark_all_read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications([]);
    } catch (err) {
      console.error("Notifications RT error:", err);
    }
  };

  return (
    <NotificationsContext.Provider value={{ notifications, markAllAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}
