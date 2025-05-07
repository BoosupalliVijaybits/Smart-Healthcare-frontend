import React, { useEffect, useState } from "react";
import { cards } from "../../Data/DummyJson";
import { useNavigate } from "react-router-dom";
import {
  useLazyGettimeslotsViewQuery,
  useLazyToday_appoinmentsQuery,
  useLazyUpcomming_appoinmentsQuery,
} from "../../Data/Api/api";
import useUser from "../../Data/Local/userDetail";
import PageLoad from "../../components/Loading/PageLoad";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [todayApp, setTodayApp] = useState([]);
  const [upcommApp, setUpcommApp] = useState([]);
  const [completApp, setcompletApp] = useState([]);

  const doctor_id = user?.res?.id;
  console.log("indashuser", doctor_id);

  const [upcommitAppoinmentApi] = useLazyUpcomming_appoinmentsQuery();
  const [todayAppoinment] = useLazyToday_appoinmentsQuery();

const upcommingApi = () => {
    setLoading(true);
    upcommitAppoinmentApi()
      .unwrap()
      .then((res) => {
        console.log("upRes", res);
        const completedData = res?.filter(
          (item) => item?.status == "COMPLETED"
        );
        const progress = res?.filter((item) => item?.status !== "COMPLETED");
        setcompletApp(completedData || []);
        setUpcommApp(progress || []);
        todayAppoinment()
          .unwrap()
          .then((res) => {
            console.log("ToRes", res);
            const progress = res?.filter(
              (item) => item?.status !== "COMPLETED"
            );
            setTodayApp(progress || []);
          })
          .catch((err) => {
            console.log("Err", err);
          });
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    upcommingApi();
  }, []);

  return (
    <div className="cardBox">
      {loading ? (
        <PageLoad />
      ) : (
        <>
          <div
            onClick={() => {
              navigate("/doctor/today-appointment");
            }}
            className="card"
          >
            <div>
              <div className="numbers f3 fs-xxl-40 fs-xl-40 fs-lg-30 black fs-sm-29  fs-xs-25">
                {todayApp?.length || 0}
              </div>
              <div className="cardName f5 fs-xxl-25 fs-xl-20 fs-lg-17 black fs-sm-15  fs-xs-15">
                Todays Appointments
              </div>
            </div>
            <div className="iconbox">
              <CampaignOutlinedIcon className="icon" />
            </div>
          </div>
          <div
            onClick={() => {
              navigate("/doctor/upcomming-appointment");
            }}
            className="card"
          >
            <div>
              <div className="numbers f3 fs-xxl-40 fs-xl-40 fs-lg-30 black fs-sm-29  fs-xs-25">
                {upcommApp?.length || 0}
              </div>
              <div className="cardName f5 fs-xxl-25 fs-xl-20 fs-lg-17 black fs-sm-15  fs-xs-15">
                Upcoming Appointments
              </div>
            </div>
            <div className="iconbox">
              <TodayRoundedIcon className="icon" />
            </div>
          </div>
          <div
            onClick={() => {
              navigate("/doctor/patient");
            }}
            className="card"
          >
            <div>
              <div className="numbers f3 fs-xxl-40 fs-xl-40 fs-lg-30 black fs-sm-29  fs-xs-25">
                {completApp?.length || 0}
              </div>
              <div className="cardName f5 fs-xxl-25 fs-xl-20 fs-lg-17 black fs-sm-15  fs-xs-15">
                Completed
              </div>
            </div>
            <div className="iconbox">
              <HowToRegRoundedIcon className="icon" />
            </div>
          </div>
          {/* {cards?.map((item) => {
            return (
              <div
                onClick={() => {
                  navigate(item?.navi);
                }}
                className="card"
              >
                <div>
                  <div className="numbers f3 fs-xxl-40 fs-xl-40 fs-lg-30 black fs-sm-29  fs-xs-25">
                    {item?.number}
                  </div>
                  <div className="cardName f5 fs-xxl-25 fs-xl-20 fs-lg-17 black fs-sm-15  fs-xs-15">
                    {item?.text}
                  </div>
                </div>
                <div className="iconbox">
                  <item.icon className="icon" />
                </div>
              </div>
            );
          })} */}
        </>
      )}
    </div>
  );
};

export default DoctorDashboard;
