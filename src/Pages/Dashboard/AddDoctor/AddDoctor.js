import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // img host

  const imageHost = process.env.REACT_APP_imgbb;

  const navigate = useNavigate();

  const { data: subjects = [] } = useQuery({
    queryKey: ["subject"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/servicesSpecial");
      const data = await res.json();
      return data;
    },
  });

  const handleDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imageHost}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((datas) => {
        if (datas.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            subject: data.select,
            image: datas.data.url,
          };

          // save doctor information

          fetch("http://localhost:5000/doctors", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast("Successfully Doctor added");
                navigate("/dashboard/manageDoctor/");
              }
            });
        }
      });
  };

  return (
    <div>
      <div className="w-[50%] px-7 mt-5 py-6 mx-auto shadow-lg">
        <h1 className="font-bold my-1 text-center text-2xl ">Add A DOCTOR</h1>{" "}
        <form
          onSubmit={handleSubmit(handleDoctor)}
          className="divide-y divide-gray-200"
        >
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative">
              <input
                id="name"
                type="name"
                {...register("name", {
                  required: "name Field Is Required",
                })}
                className="peer placeholder-transparent my-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Name"
              />

              {errors.name && (
                <p className="text-amber-400">{errors?.name?.message}</p>
              )}

              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Name
              </label>
            </div>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email Field Is Required",
                })}
                className="peer placeholder-transparent my-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Email address"
              />

              {errors.email && (
                <p className="text-amber-400">{errors?.email?.message}</p>
              )}

              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email Address
              </label>
            </div>
            <div className="relative">
              <select
                id="select"
                {...register("select", {
                  required: "You have to select One Option",
                })}
                className="select select-bordered w-full my-3"
              >
                {subjects.map((s) => (
                  <option key={s._id}>{s.name}</option>
                ))}
              </select>

              {errors?.select && (
                <p className="text-xs text-amber-400">
                  {" "}
                  {errors?.select?.message}
                </p>
              )}
              <label
                htmlFor="select"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Select SubJect
              </label>
            </div>
            <div className="relative">
              <input
                id="image"
                type="file"
                {...register("image", {
                  required: "Image Field Is Required",
                })}
                className="peer placeholder-transparent my-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Choose a Photo"
              />

              {errors.image && (
                <p className="text-amber-400">{errors?.image?.message}</p>
              )}

              <label
                htmlFor="image"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Photo
              </label>
            </div>
            <div className="relative">
              <button
                type="submit"
                className="btn btn-accent btn-sm text-white rounded-md px-4 py-0"
              >
                Add A Doctor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
