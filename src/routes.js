import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginScreen from "./screens/Authentication/LoginScreen";
import "./assets/styles/Font.scss";
import "./assets/styles/styles.scss";
import "./assets/styles/responcive.scss";
import "./assets/styles/keyframes.scss";
import "./assets/styles/custome.scss";
import "./assets/styles/fontSize.scss";
import "./assets/styles/width.scss";
import "./assets/styles/height.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./screens/Authentication/ForgotPassword";
import RegisterScreen from "./screens/Authentication/RegisterScreen";
import AdminAprovalScreen from "./screens/Authentication/AdminAprovalScreen";
import HomeScreen from "./screens/Patient/HomeScreen";
import AboutScreen from "./screens/Patient/AboutScreen";
import ContactScreen from "./screens/Patient/ContactScreen";
import ReviewScreen from "./screens/Patient/ReviewScreen";
import PationtHomeScreen from "./screens/Patient/PationtHomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Layout1 from "./components/Layout/Layout1";
import AppointmentScreen from "./screens/Patient/AppointmentScreen";
import MedicationTrackingScreen from "./screens/Patient/MedicationTrackingScreen";
import PationtHistoryScreen from "./screens/Patient/PationtHistoryScreen";
import PationtNotificationScreen from "./screens/Patient/PationtNotificationScreen";
import CommonForgotPasswordScreen from "./screens/CommonForgotPasswordScreen";
import AppoinmentFormScreen from "./screens/Patient/AppoinmentFormScreen";
import PationtContactScreen from "./screens/Patient/PationtContactScreen";
import AppointmentDetailScreen from "./screens/Patient/AppointmentDetailScreen";
import DoctorProfileScreen from "./screens/Doctor/DoctorProfileScreen";
import DoctorDashboard from "./screens/Doctor/DoctorDashboard";
import DoctorAppointmentScreen from "./screens/Doctor/DoctorAppointmentScreen";
import DoctorAppointmentDetailScreen from "./screens/Doctor/DoctorAppointmentDetailScreen";
import PationtRequestScreen from "./screens/Doctor/PationtRequestScreen";
import DoctorPAtionScree from "./screens/Doctor/DoctorPAtionScree";
import PationtDetaileViewScreen from "./screens/Doctor/PationtDetaileViewScreen";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import DoctorRequestScreen from "./screens/Admin/DoctorRequestScreen";
import DoctorDetailScreen from "./screens/Admin/DoctorDetailScreen";
import DoctorsListScreen from "./screens/Admin/DoctorsListScreen";
import PationtListScreen from "./screens/Admin/PationtListScreen";
import PationtDetailScreen from "./screens/Admin/PationtDetailScreen";
import PationtRequestListScreen from "./screens/Admin/PationtRequestListScreen";
import useUser from "./Data/Local/userDetail";
import PageNotFoundScreen from "./screens/PageNotFoundScreen";
import AdminProfileScreen from "./screens/AdminProfileScreen";
import { useSelector } from "react-redux";
import ResetPasswordScreen from "./screens/Authentication/ResetPasswordScreen";
import PatientDoctorDetailScreen from "./screens/Patient/DoctorDetailScreen";
import PatientDoctorListScreen from "./screens/Patient/DoctorSLIstScreen";
import TimeSlotScreen from "./screens/Doctor/TimeSlotScreen";
import { web_whatsapp } from "./assets/image";
import { toast } from "react-toastify";
import { useLazyGetnotificationQuery } from "./Data/Api/api";
import PationtsSloatCalender from "./screens/Patient/PationtsSloatCalender";
import TodayAppoinmentScreen from "./screens/Doctor/TodayAppoinmentScreen";
import HistoryScreen from "./screens/Patient/HistoryScreen";

const ReactRoute = () => {
  const { user, setUser } = useUser();
  const loginType = user?.type;
  const nav = useSelector((state) => state?.backHandler);
  const location = useLocation();
  const token = location?.search;


  const [notificationApi] = useLazyGetnotificationQuery();


  useEffect(() => {
    if (localStorage.getItem("hasInteracted")) {

    }

    const handleUserInteraction = () => {
      if (!localStorage.getItem("hasInteracted")) {
        localStorage.setItem("hasInteracted", "true");

      }
    };

    window.addEventListener("click", handleUserInteraction);
    return () => window.removeEventListener("click", handleUserInteraction);
  }, [nav]);

  useEffect(() => {
    if (user?.type !== "ADMIN") return;

    let previousCount = 0;

    const fetchNotifications = () => {
      notificationApi()
        .unwrap()
        .then((res) => {
          const newCount = res || 0;
          if (newCount > previousCount) {
            previousCount = newCount;
            playSound();
            toast.info("👨‍⚕️ New doctor registered!");
          }
        })
        .catch((err) => {
          console.log("Notification API Error", err);
        });
    };

    const interval = setInterval(fetchNotifications, 10000);
    fetchNotifications();

    return () => clearInterval(interval);
  }, [user]);

  const playSound = () => {
    const audio = new Audio(web_whatsapp);
    audio.play().catch((err) => {
      console.warn("Audio play blocked:", err);
    });
    toast("You got a message! 🔔");
  };

  return (
    <Routes>
      {loginType == "PATIENT" ? (
        <>
          {token && (
            <Route path="/reset-password" element={<ResetPasswordScreen />} />
          )}
          <Route path="*" element={<PageNotFoundScreen />} />
          <Route element={<Layout1 />}>
            <Route path="/patient/about" element={<AboutScreen />} />
            <Route path="/patient/contact" element={<PationtContactScreen />} />
            <Route path="/patient/review" element={<ReviewScreen />} />
            <Route path="/patient/profile" element={<ProfileScreen />} />
            <Route path="/patient/home" element={<PationtHomeScreen />} />
            <Route path="/" element={<PationtHomeScreen />} />
            <Route
              path="/patient/appointment"
              element={<AppointmentScreen />}
            />
            <Route
              path="/patient/calendar/view"
              element={<PationtsSloatCalender />}
            />
            <Route
              path="/patient/doctors"
              element={<PatientDoctorListScreen />}
            />
            <Route
              path="/patient/doctors/detail"
              element={<PatientDoctorDetailScreen />}
            />
            <Route
              path="/patient/appointment/detail"
              element={<AppointmentDetailScreen />}
            />

            <Route path="/pationt/history" element={<HistoryScreen />} />
            {/* <Route
              path="/patient/appointment/request"
              element={<AppoinmentFormScreen />}
            /> */}
            <Route
              path="/profile/forgotpassword"
              element={<CommonForgotPasswordScreen />}
            />
            <Route
              path="/patient/medicationtracking"
              element={<MedicationTrackingScreen />}
            />
            <Route
              path="/patient/notification"
              element={<PationtNotificationScreen />}
            />
          </Route>
        </>
      ) : loginType == "DOCTOR" && user?.res?.status == "APPROVED" ? (
        <>
          {token && (
            <Route path="/reset-password" element={<ResetPasswordScreen />} />
          )}

          <Route path="*" element={<PageNotFoundScreen />} />
          <Route element={<Layout1 />}>
            <Route path="/" element={<DoctorDashboard />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/profile" element={<DoctorProfileScreen />} />
            <Route path="/doctor/timeslots" element={<TimeSlotScreen />} />
            <Route
              path="/profile/forgotpassword"
              element={<CommonForgotPasswordScreen />}
            />
            <Route
              path="/doctor/today-appointment"
              element={<TodayAppoinmentScreen />}
            />
            <Route
              path="/doctor/upcomming-appointment"
              element={<PationtRequestScreen />}
            />
            {/* <Route path="/profile" element={<ProfileScreen />} /> */}
            <Route
              path="/doctor/patient-request"
              element={<DoctorAppointmentScreen />}
            />
            <Route path="/doctor/contact" element={<PationtContactScreen />} />
            <Route
              path="/doctor/notification"
              element={<PationtNotificationScreen />}
            />
            <Route
              path="/doctor/today-appointment/detail"
              element={<DoctorAppointmentDetailScreen />}
            />
            <Route
              path="/doctor/upcomming-appointment/detail"
              element={<DoctorAppointmentDetailScreen />}
            />
            <Route path="/doctor/patient" element={<DoctorPAtionScree />} />
            <Route
              path="/doctor/patient/detail"
              // element={<PationtDetaileViewScreen />}
              element={<DoctorAppointmentDetailScreen />}
            />
          </Route>
        </>
      ) : loginType == "ADMIN" ? (
        <>
          {token && (
            <Route path="/reset-password" element={<ResetPasswordScreen />} />
          )}
          <Route path="*" element={<PageNotFoundScreen />} />
          <Route element={<Layout1 />}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/doctor/request"
              element={<DoctorRequestScreen />}
            />
            <Route
              path="/admin/notification"
              element={<PationtNotificationScreen />}
            />
            {/* <Route path="/admin/contact" element={<PationtContactScreen />} /> */}
            <Route
              path="/admin/patient/request"
              element={<PationtRequestListScreen />}
            />
            <Route
              path="/admin/doctor/request/detail"
              element={<DoctorDetailScreen />}
            />
            <Route path="/admin/doctor" element={<DoctorsListScreen />} />
            <Route path="/admin/profile" element={<AdminProfileScreen />} />
            <Route
              path="/admin/doctor/detail"
              element={<DoctorDetailScreen />}
            />
            <Route
              path="/admin/doctor/time-slots"
              element={<PatientDoctorDetailScreen />}
            />
            <Route path="/admin/patient" element={<PationtListScreen />} />
            <Route
              path="/admin/patient/detail"
              element={<PationtDetailScreen />}
            />
            <Route
              path="/profile/forgotpassword"
              element={<CommonForgotPasswordScreen />}
            />
          </Route>
        </>
      ) : (
        loginType == null && (
          <>
            {user?.res?.status == "PENDING" && (
              <>
                <Route path="/" element={<AdminAprovalScreen />} />
                <Route path="/waiting" element={<AdminAprovalScreen />} />
              </>
            )}
            <Route path="*" element={<PageNotFoundScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            {token && (
              <Route path="/reset-password" element={<ResetPasswordScreen />} />
            )}
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/waiting" element={<AdminAprovalScreen />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/review" element={<ReviewScreen />} />
            </Route>
            <Route path="*" element={<PageNotFoundScreen />} />
          </>
        )
      )}
    </Routes>
  );
};

export default ReactRoute;
