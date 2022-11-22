import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthProvider";

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
  const { name, slots, price } = treatment;

  const { user } = useContext(AuthContext);

  const dates = format(date, "PP");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const names = form.name.value;
    const email = form.email.value;
    const phone = form.number.value;
    const slot = form.slot.value;

    const patientInfo = {
      treatmentDate: dates,
      treatmentName: name,
      patient: names,
      email,
      phone: phone,
      time: slot,
      price,
    };

    console.log(patientInfo);
    // post all data

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Booking Approved");
          setTreatment(null);
          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder={dates}
                className="input input-bordered w-full "
                disabled
              />

              <>
                <select
                  name="slot"
                  required
                  className="select select-bordered w-full "
                >
                  {slots.map((s, i) => (
                    <option key={i}>{s} </option>
                  ))}
                </select>
              </>

              <input
                name="name"
                type="text"
                placeholder="Your Name"
                defaultValue={user?.displayName}
                className="input input-bordered w-full "
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                defaultValue={user?.email}
                className="input input-bordered w-full "
                required
              />
              <input
                type="text"
                name="number"
                placeholder="Your Number"
                className="input input-bordered w-full "
                required
              />

              <input className="btn w-full" type="submit" value="SUBMIT" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
