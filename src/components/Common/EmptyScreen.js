import React from "react";
import { emptyappoinmrnt } from "../../assets/image";

const EmptyScreen = ({ img, content }) => {
  return (
    <div className="emptycomp d-flex ac-jc flex-column">
      <div className="emtimg">
        <img src={img} />
      </div>
      <p className="primary f2 fs-xxl-25 fs-xl-24 fs-lg-23 fs-sm-20 fs-xs-20">
        {content}
      </p>
    </div>
  );
};

export default EmptyScreen;
