import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Admin from "../../Pages/Admin/Admin";
import Appoinment from "../../Pages/Appoinment/Appoinment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctor from "../../Pages/Dashboard/ManageDoctor/ManageDoctor";
import About from "../../Pages/About/About";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Reviews from "../../Pages/Reviews/Reviews";
import PrivateRoute from "../../Routes/PrivateRoute/PrivateRoute";
import Checkout from "../../Pages/Checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/appointment",
        element: <Appoinment></Appoinment>,
      },
      {
        path: "/about",
        element: <About> </About>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/reviews",
        element: (
          <PrivateRoute>
            {" "}
            <Reviews></Reviews>{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/Checkout/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/dashboard/Checkout/${params.id}`),
        element: <Checkout></Checkout>,
      },
      {
        path: "/dashboard/admin/",
        element: <Admin></Admin>,
      },
      {
        path: "/dashboard/doctor/",
        element: <AddDoctor></AddDoctor>,
      },
      {
        path: "/dashboard/manageDoctor/",
        element: <ManageDoctor></ManageDoctor>,
      },
    ],
  },
]);

export default router;
