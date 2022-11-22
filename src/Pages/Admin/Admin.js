import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      return data;
    },
  });

  const handleAdmin = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Admin Role Added");
          refetch();
        }
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th> User Email</th>
              <th> User Role</th>
              <th>Remove User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <> </>
                  ) : (
                    <>
                      {" "}
                      <button
                        onClick={() => handleAdmin(user._id)}
                        className="btn btn-xs btn-primary"
                      >
                        {" "}
                        make Admin{" "}
                      </button>{" "}
                    </>
                  )}
                </td>
                <td>
                  <button className="btn btn-xs btn-accent"> Delete </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
