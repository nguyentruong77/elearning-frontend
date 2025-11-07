import MainLayout from "../layouts/MainLayout";
import Home from "../pages/index";
import Contact from "../pages/Contact";
import Course from "../pages/Course";
import CourseDetail from "../pages/course/[slug]";
import RegisterPage from "../pages/register/[id]";
import Team from "../pages/Team";
import Project from "../pages/Project";
import FAQ from "../pages/FAQ";
import Payment from "../pages/Payment";
import Coin from "../pages/Coin";
import AuthRouter from "../components/AuthRouter";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ResetPassword from "../pages/reset-password";
import Page404 from "../pages/404";
import { PATH } from "../config/path";
import { profile } from "./profile";

export const routers = (user, login, logout) => [
  {
    element: <MainLayout user={user} login={login} logout={logout} />,
    children: [
      { element: <Home />, index: true },
      { path: PATH.contact, element: <Contact /> },
      {
        path: PATH.course,
        children: [
          { index: true, element: <Course /> },
          { path: PATH.courseDetail, element: <CourseDetail /> },
        ],
      },
      { path: PATH.courseRegister, element: <RegisterPage /> },
      { path: PATH.team, element: <Team /> },
      { path: PATH.project, element: <Project /> },
      { path: PATH.faq, element: <FAQ /> },
      { path: PATH.payment, element: <Payment /> },
      { path: PATH.coin, element: <Coin /> },

      {
        element: <AuthRouter user={user} redirect={PATH.home} />,
        children: [
          { path: PATH.signin, element: <SignIn login={login} user={user} /> },
          { path: PATH.signup, element: <SignUp user={user} /> },
          { path: PATH.resetPassword, element: <ResetPassword user={user} /> },
        ],
      },

      profile(user),

      { path: "*", element: <Page404 /> },
    ],
  },
];
