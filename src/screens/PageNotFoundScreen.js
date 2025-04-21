import React, { useEffect, useState } from "react";
import { pagenotfound } from "../assets/image";
import { useLocation, useNavigate } from "react-router-dom";
import PageLoad from "../components/Loading/PageLoad";
import useUser from "../Data/Local/userDetail";

const PageNotFoundScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [pageLoadtog, setPageLoaddtog] = useState(true);

  const btnclike = () => {
    setPageLoaddtog(true);
    navigate("/");
    setTimeout(() => {
      setPageLoaddtog(false);
    }, 2000);
  };

  useEffect(() => {
    setPageLoaddtog(true);
    setTimeout(() => {
      setPageLoaddtog(false);
    }, 1500);
  }, []);
  // }, [user, location]);

  return (
    <>
      {pageLoadtog ? (
        <PageLoad />
      ) : (
        <div className="w-100 notfound-cont bg-primary1 p-5 gap-4">
          <h1 className="f3 text-center primary fs-xxl-38 fs-xl-37 fs-lg-22 fs-sm-21 fs-xs-20">
            Oops!
          </h1>
          <div className="d-flex flex-column ac-jc inlay">
            <div className="imgcont  ">
              <img src={pagenotfound} />
            </div>
          </div>
          <div className="d-flex flex-column ac-jc gap-4">
            <h3 className="text-center primary f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13">
              We can't seem of find a page you are looking for
            </h3>
            <button
              onClick={() => {
                btnclike();
              }}
              className="notfound-btn white py-2 border-0 rounded-3 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
            >
              Back to home
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PageNotFoundScreen;
