import React from "react";
import AppoinmentBanner from "./AppoinmentBanner/AppoinmentBanner";
import AppoinmentService from "./AppoinmentService/AppoinmentService";

const Appoinment = () => {
  const [selecteDate, setSelectedDate] = React.useState(new Date());

  return (
    <div>
      <AppoinmentBanner
        selecteDate={selecteDate}
        setSelectedDate={setSelectedDate}
      ></AppoinmentBanner>
      <AppoinmentService selecteDate={selecteDate}></AppoinmentService>
    </div>
  );
};

export default Appoinment;
