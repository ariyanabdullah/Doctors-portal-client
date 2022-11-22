import React from "react";
import chair from "../../../assets/images/chair.png";

import { DayPicker } from "react-day-picker";

const AppoinmentBanner = ({ selecteDate, setSelectedDate }) => {
  return (
    <header className="my-6">
      <div className="hero  ">
        <div className="hero-content justify-evanly flex flex-col lg:flex-row-reverse ">
          <img
            src={chair}
            alt="Chai"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="sm:mr-0 md:mr-7 lg:mr-9">
            <DayPicker
              mode="single"
              selected={selecteDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppoinmentBanner;
