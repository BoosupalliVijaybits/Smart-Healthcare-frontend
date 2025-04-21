import React, { useEffect, useState } from "react";
import AppoinmentTop from "../../components/Pationt/MyAppoinment/AppoinmentTop";
import AppoinmentList from "../../components/Pationt/MyAppoinment/AppoinmentList";
import EmptyScreen from "../../components/Common/EmptyScreen";
import { emptyappoinmrnt } from "../../assets/image";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useLazyPatientsupcommingappQuery,
  useLazyUpcomming_appoinmentsQuery,
} from "../../Data/Api/api";
import PageLoad from "../../components/Loading/PageLoad";

const AppointmentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);

  const staetData = location?.state;
  console.log("staetData", staetData);

  // Api
  const [getAllAppoinment] = useLazyPatientsupcommingappQuery();

  const getmyAppFun = () => {
    setLoading(true);
    getAllAppoinment()
      .unwrap()
      .then((res) => {
        console.log("Ress", res);
        setData(res);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getmyAppFun();
  }, []);

  const toggleFun = (item) => {
    setToggle(item?.id);
  };
  return (
    <div>
      {loading && <PageLoad />}
      {data?.length == 0 ? (
        <EmptyScreen
          img={emptyappoinmrnt}
          content="Please add Book a Appoinment"
        />
      ) : (
        <>
          {/* <AppoinmentTop toggleFun={toggleFun} toggle={toggle} /> */}
          <AppoinmentList datas={data} />
        </>
      )}
    </div>
  );
};

export default AppointmentScreen;
