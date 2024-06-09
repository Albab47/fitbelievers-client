import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import TrainersPage from "../pages/Trainers/TrainersPage";
import TrainerDetailsPage from "../pages/TrainerDetails/TrainerDetailsPage";
import BeATrainerPage from "../pages/BeATrainerPage/BeATrainerPage";
import PrivateRoute from "./PrivateRoute";
import AppliedTrainers from "../pages/Dashboard/Admin/AppliedTrainers";
import AddSlot from "../pages/Dashboard/Tainer/AddSlot";
import TrainersRoute from "./TrainersRoute";
import ApTrainerDetails from "../pages/Dashboard/Admin/ApTrainerDetails";
import AdminRoute from "./AdminRoute";
import AddClass from "../pages/Dashboard/Admin/AddClass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/trainers",
        element: <TrainersPage />,
      },
      {
        path: "/trainers/:id",
        element: <TrainerDetailsPage />,
      },
      {
        path: "/be-a-trainer",
        element: <PrivateRoute><BeATrainerPage /></PrivateRoute>,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // Admin route
      {
        path: "applied-trainers",
        element: <AdminRoute><AppliedTrainers /></AdminRoute>,
      },
      {
        path: "applied-trainers/:id",
        element: <AdminRoute><ApTrainerDetails /></AdminRoute>,
      },
      {
        path: "add-class",
        element: <AdminRoute><AddClass /></AdminRoute>,
      },
      // Trainers route
      {
        path: "add-slot",
        element: <TrainersRoute><AddSlot /></TrainersRoute>,
      },
    ]
  },

]);

export default router;
