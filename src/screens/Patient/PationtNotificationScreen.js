import React, { useEffect, useState } from "react";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import {
  useLazyGetnotificationQuery,
  useNotificationreadMutation,
} from "../../Data/Api/api";
import EmptyScreen from "../../components/Common/EmptyScreen";
import { emptynotif } from "../../assets/image";
import PageLoad from "../../components/Loading/PageLoad";
import { useNavigate } from "react-router-dom";

const PationtNotificationScreen = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loadin, setLoadin] = useState(true);

  // Api
  const [notificationApi] = useLazyGetnotificationQuery();
  const [notification_read] = useNotificationreadMutation();

  const getNotifFun = () => {
    setLoadin(true);
    notificationApi()
      .unwrap()
      .then((res) => {
        console.log("Response from API:", res);
        const parsed = res.map((item) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(item.message, "text/html");
          const title = doc.querySelector("h2")?.textContent || "Notification";
          const description = doc.querySelector("p")?.textContent || "";
          return {
            ...item,
            title,
            description,
            isRead: item.read, // sync with backend field
          };
        });

        // Sort by date (newest first)
        const sorted = parsed.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setNotifications(sorted);
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  const handleMarkAsRead = (item) => {
    console.log("item", item);
    const id = item?.id;
    notification_read(id)
      .unwrap()
      .then((res) => {
        console.log("Ress", res);
        if (item?.title == "Doctor Registration Approved") {
          navigate("/doctor/timeslots");
        } else if (item?.title == "New Doctor Registered") {
          navigate("/admin/doctor/request", {
            state: { item, type: "notification" },
          });
        }
        getNotifFun();
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {});
    // const updatedNotifications = notifications.map((noti) =>
    //   noti.id === id ? { ...noti, isRead: true } : noti
    // );
    // setNotifications(updatedNotifications);
  };

  useEffect(() => {
    getNotifFun();
  }, []);

  return (
    <>
      {loadin ? (
        <PageLoad />
      ) : (
        <div className="notification-container rounded-3 mb-3">
          <p className="text-uppercase primary f2 fs-xxl-19 fs-xl-19 fs-lg-18 fs-sm-17 fs-xs-15 textani">
            <span className="pe-2">
              <NotificationsActiveOutlinedIcon />
            </span>
            Notifications
          </p>

          {notifications.length === 0 ? (
            <EmptyScreen img={emptynotif} />
          ) : (
            <div className="notification-list">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`notification-card ${
                    !item.isRead ? "unread" : ""
                  }`}
                  onClick={() => {
                    if (item?.read) {
                      if (item?.title == "Doctor Registration Approved") {
                        navigate("/doctor/timeslots");
                      } else if (item?.title == "New Doctor Registered") {
                        navigate("/admin/doctor/request", {
                          state: { item, type: "notification" },
                        });
                      }
                    } else {
                      handleMarkAsRead(item);
                    }
                  }}
                >
                  <div className="noti-header">
                    <h4 className="f2 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                      {item.title}
                    </h4>
                    <span className="noti-time f4 fs-xxl-13 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani">
                      {new Date(item.date).toLocaleString()}
                    </span>
                  </div>
                  <p className="f1 fs-xxl-13 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani black">
                    {item.description}
                  </p>
                  {!item.isRead && <span className="dot"></span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PationtNotificationScreen;
