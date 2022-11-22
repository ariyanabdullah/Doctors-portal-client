import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useTook from "../../Hooks/useTook";

const Login = () => {
  const { SignIn } = useContext(AuthContext);

  const [eror, setEror] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [userEmail, setUserEmail] = useState("");

  const [utoken] = useTook(userEmail);

  if (utoken) {
    navigate(from, { replace: true });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLog = (data) => {
    const { email, password } = data;

    SignIn(email, password)
      .then((result) => {
        setEror("");
        setUserEmail(email);
        // navigate(from, { replace: true });
      })
      .catch((err) => setEror(err.message));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Log In</h1>
            </div>
            <form
              onSubmit={handleSubmit(handleLog)}
              className="divide-y divide-gray-200"
            >
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email field is Required",
                    })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />

                  {errors.email && (
                    <p className="text-amber-500 text-sm">
                      {" "}
                      {errors.email?.message}{" "}
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
                      required: " Password field is required",
                      minLength: {
                        value: 6,
                        message:
                          "Password length should be at least 6 character",
                      },
                    })}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-amber-500 text-sm">
                      {" "}
                      {errors.password?.message}
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
                  <p className="text-amber-400 font-bold"> {eror} </p>
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="btn btn-secondary btn-sm text-white rounded-md px-4 py-0"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </form>
            <div>
              <h1>
                New To Doctors Portal?{" "}
                <small className="text-secondary">
                  <Link to="/register"> Create a New Account</Link>
                </small>
              </h1>
            </div>
            <div className="divider">OR</div>
            <div className="relative">
              <button className=" btn btn-outline btn-secondary text-white rounded-md px-2 py-1">
                Sign In with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
