import React from "react";
import { cards } from "../../../Data/DummyJson";

const Dashboard = () => {
  return (
    <div className="cardBox">
      {cards?.map((item) => {
        return (
          <div className="card">
            <div>
              <div className="numbers">{item?.number}</div>
              <div className="cardName">{item?.text}</div>
            </div>
            <div className="iconbox">
              <item.icon className="icon" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
