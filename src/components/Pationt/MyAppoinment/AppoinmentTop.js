import React from "react";
import { appoinmrntList } from "../../../Data/DummyJson";

const AppoinmentTop = ({ toggleFun, toggle }) => {
  return (
    <div className="d-flex w-100 ac-js gap-4 app-toggle">
      {appoinmrntList?.map((item) => {
        return (
          <button
            onClick={() => {
              toggleFun(item);
            }}
            className={`${
              toggle == item?.id ? "active f3" : "f2"
            } border-0 rounded-3 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15  fs-xs-14 textani`}
          >
            {item?.name}
          </button>
        );
      })}
    </div>
  );
};

export default AppoinmentTop;
