// import { Result } from "postcss";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useTook from "../../Hooks/useTook";

const Register = () => {
  const { createUser, UpdateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const [utoken] = useTook(userEmail);

  if (utoken) {
    navigate("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReg = (data) => {
    const { name, email, password } = data;

    createUser(email, password)
      .then((result) => {
        UpdateUser(name)
          .then((user) => {
            toast("User Created successfully");
            saveUser(name, email);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  // save user all Information
  const saveUser = (name, email) => {
    const user = {
      name: name,
      email: email,
    };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setUserEmail(email);
        }
      });
  };

  // get authToken

  // const saveToken = (email) => {
  //   fetch(`http://localhost:5000/jwt?email=${email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.accessToken) {
  //         localStorage.setItem("token", data.accessToken);
  //       }
  //     });
  // };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Register Now</h1>
            </div>
            <form
              onSubmit={handleSubmit(handleReg)}
              className="divide-y divide-gray-200"
            >
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name Is Required" })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Your Name"
                  />

                  {errors.name && (
                    <p className="text-red-400 font-thin text-sm">
                      {" "}
                      {errors.name?.message}{" "}
                    </p>
                  )}

                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email Field Is Required",
                    })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-red-400 font-thin text-sm">
                      {" "}
                      {errors.email?.message}
                    </p>
                  )}

                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password Field Is Required",
                      minLength: {
                        value: 6,
                        message: "Password Should be At least 6 character",
                      },

                      pattern: {
                        value: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                        message:
                          "Password must have one uppercase with one special character ",
                      },
                    })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-400 font-thin text-sm">
                      {" "}
                      {errors.password?.message}{" "}
                    </p>
                  )}
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="btn btn-secondary btn-sm text-white rounded-md px-4 py-0"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
            <div>
              <h1>
                Do You have Already an Acount?{" "}
                <small className="text-secondary">
                  <Link to="/login"> Log In now !</Link>
                </small>
              </h1>
            </div>
            <div className="divider">OR</div>
            <div className="relative">
              <button className=" btn btn-outline btn-secondary text-white rounded-md px-2 py-1">
                Register with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
