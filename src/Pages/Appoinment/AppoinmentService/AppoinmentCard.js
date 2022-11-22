import React from "react";

const AppoinmentCard = ({ service, setTreatment, treatment }) => {
  const { name, slots, price } = service;

  return (
    <div className="card text-center  bg-base-100 shadow border rounded-lg">
      <div className="card-body">
        <h2 className="text-secondary text-2xl font-bold">{name}</h2>
        <p className="font-semibold">
          {" "}
          {slots.length > 0 ? slots[0] : "Try Another Day"}
        </p>
        <p className="font-semibold">
          {slots.length} {slots.length > 0 ? "spaces" : "space"} Available{" "}
        </p>

        <p className="font-semibold text-amber-400"> price: ${price} </p>

        <div className="card-actions justify-center">
          <label
            disabled={slots.length === 0}
            onClick={() => setTreatment(service)}
            htmlFor="booking-modal"
            className="btn btn-primary"
          >
            BOOK APPOINTMENT
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentCard;
