import React from "react";

const Poppup = ({ type, poppupHandle, cont }) => {
  return (
    <>
      <div
        style={{
          zIndex: 1000000,
        }}
        className="main-poppup d-flex ac-jc"
      >
        <button
          onClick={() => {
            poppupHandle();
          }}
          className="poppup-layer border-0"
        />

        <div className="logout-cont w-md-40 w-80  rounded-3 p-md-3 p-4 d-flex gap-4 ac-jc flex-column">
          <p className="black f3 text-center fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 textani">
            {cont}
          </p>
          {type == "logout" && (
            <div className="d-flex ac-jc gap-md-4 gap-2 w-100">
              <button
                onClick={() => {
                  poppupHandle("yes");
                }}
                className="inner-btn py-2 py-md-2 yes w-md-40 wi-100 border-0 bg-primarys white rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
              >
                Logout
              </button>
              <button
                onClick={() => {
                  poppupHandle("no");
                }}
                className="inner-btn no py-2 py-md-2 w-md-40 wi-100 inner-btn yes primary rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 bg-transparent"
              >
                Cancel
              </button>
            </div>
          )}
          {type == "appoinmentcancle" && (
            <div className="d-flex ac-jc gap-md-4 gap-2 w-100">
              <button
                onClick={() => {
                  poppupHandle("yes");
                }}
                className="inner-btn py-2 py-md-2 yes w-md-40 wi-100 border-0 bg-primarys white rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  poppupHandle("no");
                }}
                className="inner-btn no py-2 py-md-2 w-md-40 wi-100 inner-btn yes primary rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 bg-transparent"
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Poppup;
