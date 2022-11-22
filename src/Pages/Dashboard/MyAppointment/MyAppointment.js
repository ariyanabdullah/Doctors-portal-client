import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
const MyAppointment = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      {/* table section */}
      <section>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Patient </th>
                <th>Appointment Name</th>
                <th>Appointment Date</th>
                <th>Appointment Time </th>
                <th>Pay Now</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((book, i) => (
                <tr key={book._id}>
                  <th>{i + 1}</th>
                  <td>{book.patient}</td>
                  <td>{book.treatmentName}</td>
                  <td>{book.treatmentDate}</td>
                  <td> {book.time} </td>
                  <td>
                    {book.price && book.paid && (
                      <p className="text-blue-400"> paid</p>
                    )}
                    {book.price && !book.paid && (
                      <Link
                        to={`/dashboard/Checkout/${book._id}`}
                        className="btn btn-xs btn-primary"
                      >
                        {" "}
                        Pay{" "}
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MyAppointment;
