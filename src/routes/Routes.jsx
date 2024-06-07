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
    element: <DashboardLayout />,
  },

]);

export default router;
