import { useQuery } from "@tanstack/react-query";

import React, { useState } from "react";
import toast from "react-hot-toast";
import ConformationModal from "../../Shared/ConformationModal/ConformationModal";

const ManageDoctor = () => {
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/doctors", {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const [deleteDoctor, setDeleteDoctor] = useState(null);

  const closeModal = () => {
    setDeleteDoctor(null);
  };

  // delete doctor

  const handleDeleteDoctor = (doctor) => {
    console.log(doctor);

    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(` Delete Doctor ${doctor.name} Successful`);
          refetch();
        }
      });
  };

  console.log(deleteDoctor);

  if (isLoading) {
    return (
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={doctor.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.subject}</td>
                <td>
                  <label
                    htmlFor="confirm-modal"
                    className="btn btn-xs m-5 btn-error"
                    onClick={() => setDeleteDoctor(doctor)}
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteDoctor && (
        <ConformationModal
          title="Are You Sure You want to Delete?"
          message={` If you delete doctor  ${deleteDoctor.name} . It can be Undone `}
          closeModal={closeModal}
          modalData={deleteDoctor}
          successAction={handleDeleteDoctor}
          successBtnName="Delete"
        ></ConformationModal>
      )}
    </div>
  );
};

export default ManageDoctor;
