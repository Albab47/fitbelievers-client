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
import Classes from "../pages/Classes/ClassesPage";
import ClassesPage from "../pages/Classes/ClassesPage";
import NewsletterSubscribers from "../pages/Dashboard/Admin/NewsletterSubscribers";
import AllTrainers from "../pages/Dashboard/Admin/AllTrainers";
import ManageSlots from "../pages/Dashboard/Tainer/ManageSlots";
import TrainerBookingPage from "../pages/TrainerBookingPage/TrainerBookingPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import BookedTrainers from "../pages/Dashboard/Member/BookedTrainers";
import AddForumPage from "../pages/Dashboard/AddForumPage/AddForumPage";
import CommunityPage from "../pages/Community/CommunityPage";
import Balance from "../pages/Dashboard/Admin/Balance";

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
        path: "/classes",
        element: <ClassesPage />,
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
        path: "/trainer-booking/:id",
        element: <PrivateRoute><TrainerBookingPage /></PrivateRoute>,
      },
      {
        path: "/community",
        element: <CommunityPage />,
      },
      {
        path: "/payment",
        element: <PrivateRoute><PaymentPage /></PrivateRoute>,
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
        path: "balance",
        element: <AdminRoute><Balance /></AdminRoute>,
      },
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
      {
        path: "all-trainers",
        element: <AdminRoute><AllTrainers /></AdminRoute>,
      },
      {
        path: "subscribers",
        element: <AdminRoute><NewsletterSubscribers /></AdminRoute>,
      },
      // Trainers routes
      {
        path: "add-slot",
        element: <TrainersRoute><AddSlot /></TrainersRoute>,
      },
      {
        path: "manage-slots",
        element: <TrainersRoute><ManageSlots /></TrainersRoute>,
      },
      // Member trainer common route
      {
        path: "add-blog",
        element: <PrivateRoute><AddForumPage /></PrivateRoute>,
      },
      // Member Routes
      {
        path: "booked-trainers",
        element: <PrivateRoute><BookedTrainers /></PrivateRoute>,
      },
    ]
  },

]);

export default router;
