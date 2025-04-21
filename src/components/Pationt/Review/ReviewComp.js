import React from "react";
import { detail_list } from "../../../Data/DummyJson";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";

const ReviewComp = () => {
  return (
    <section class="info-container d-flex flex-column flex-wrap flex-sm-row as-jb p-4 p-md-5">
      {detail_list?.map((item) => {
        return (
          <div class="info">
            <div className="icon-lay d-flex ac-jc">{item?.img}</div>
            <div class="content">
              <p className="f3  fs-xxl-22 fs-xl-22 fs-lg-20 mb-0 fs-sm-17 fs-xs-18">
                {item?.big_txt}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ReviewComp;
