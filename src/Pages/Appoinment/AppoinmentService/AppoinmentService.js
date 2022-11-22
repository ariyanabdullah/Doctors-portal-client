import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import AppoinmentCard from "./AppoinmentCard";
import BookingModal from "./BookingModal";

const AppoinmentService = ({ selecteDate }) => {
  const [treatment, setTreatment] = useState(null);

  const date = format(selecteDate, "PP");

  // const { data: service=[] } = useQuery({
  //   queryKey: ["service"],
  //   queryFn: async () => {
  //     const res = await fetch("http://localhost:5000/services");
  //     const data = await res.json();
  //     return data;
  //   },
  // });

  const {
    data: service,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["service", date],
    queryFn: () =>
      fetch(`http://localhost:5000/services?date=${date}`).then((res) =>
        res.json()
      ),
  });

  return (
    <div>
      {isLoading ? (
        <>
          {" "}
          <div className="absolute right-1/2 bottom-1/4  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
          </div>{" "}
        </>
      ) : (
        <>
          {" "}
          <section className="my-7 container mx-auto">
            <p className="text-center my-6 font-bold text-secondary ">
              Available Appointments on {format(selecteDate, "PP")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.map((s) => (
                <AppoinmentCard
                  key={s._id}
                  treatment={treatment}
                  setTreatment={setTreatment}
                  service={s}
                >
                  {" "}
                </AppoinmentCard>
              ))}
            </div>

            <>
              {treatment && (
                <BookingModal
                  date={selecteDate}
                  treatment={treatment}
                  setTreatment={setTreatment}
                  refetch={refetch}
                ></BookingModal>
              )}
            </>
          </section>
        </>
      )}
    </div>
  );
};

export default AppoinmentService;
