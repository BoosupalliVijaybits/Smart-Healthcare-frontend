import React, { useEffect, useRef, useState } from "react";
import ReactRoute from "./routes";
import { useLazyGetnotificationQuery } from "./Data/Api/api";
import { logo } from "./assets/image";
import useUser from "./Data/Local/userDetail";
import NetworkErrorScreen from "./screens/Patient/NetworkErrorScreen";

const App = () => {
  const [getNotification] = useLazyGetnotificationQuery();
  const lastNotificationRef = useRef(null);
  const { user, setUser } = useUser();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const loginType = user?.type;

  const notification_page =
    loginType == "PATIENT"
      ? "http://localhost:3000/patient/notification"
      : loginType == "DOCTOR"
      ? "http://localhost:3000/doctor/notification"
      : loginType == "ADMIN"
      ? "http://localhost:3000/admin/notification"
      : null;

  // Ask for notification permission on mount
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  // Function to show notification
  const showNotification = () => {
    if (Notification.permission === "granted") {
      getNotification()
        .unwrap()
        .then((res) => {
          console.log("res", res);

          if (!res?.length) return;
          const now = new Date();
          const twentySecondsAgo = new Date(now.getTime() - 20000);
          console.log("twentySecondsAgo", twentySecondsAgo);

          const recentNotifications = res.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate > twentySecondsAgo && itemDate <= now;
          });

          if (!recentNotifications.length) return;

          recentNotifications.forEach((item) => {
            if (lastNotificationRef.current !== item.id) {
              lastNotificationRef.current = item.id;

              const parser = new DOMParser();
              const doc = parser.parseFromString(item.message, "text/html");

              const title =
                doc.querySelector("h2")?.textContent ||
                item.title ||
                "Notification";

              const description =
                doc.querySelector("p")?.textContent ||
                "You have a new message.";

              const notification = new Notification(title, {
                body: description,
                icon: logo,
              });
              notification.onclick = () => {
                window.focus();
                if (notification_page) {
                  window.location.href = notification_page;
                }
              };
            }
          });
        })
        .catch((err) => {
          console.error("Notification fetch error:", err);
        });
    } else {
      console.log("Notification permission is denied.");
    }
  };

  console.log("notification_page", notification_page);

  // Set interval to fetch notifications
  useEffect(() => {
    const intervalId = setInterval(showNotification, 20000); // 20 seconds

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up the listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  console.log("isOnline", isOnline);

  return isOnline ? <ReactRoute /> : <NetworkErrorScreen />;
};

export default App;
