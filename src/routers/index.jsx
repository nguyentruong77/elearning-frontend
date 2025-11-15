import { lazy } from "react";
import { PATH } from "../config/path";
import { profile } from "./profile";

const MainLayout = lazy(() => import("../layouts/MainLayout"))
const Home = lazy(() => import("../pages/index"))
const Contact = lazy(() => import("../pages/Contact"))
const Course = lazy(() => import("../pages/Course"))
const CourseDetail = lazy(() => import("../pages/course/[slug]"))
const RegisterPage = lazy(() => import("../pages/register/[id]"))
const Team = lazy(() => import("../pages/Team"))
const Project = lazy(() => import("../pages/Project"))
const FAQ = lazy(() => import("../pages/FAQ"))
const Payment = lazy(() => import("../pages/Payment"))
const Coin = lazy(() => import("../pages/Coin"))
const AuthRouter = lazy(() => import("../components/AuthRouter"))
const SignIn = lazy(() => import("../pages/SignIn"))
const SignUp = lazy(() => import("../pages/SignUp"))
const ResetPassword = lazy(() => import("../pages/reset-password"))
const Page404 = lazy(() => import("../pages/404"))

export const routers = [
  {
    element: <MainLayout />,
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
        element: <AuthRouter redirect={PATH.home} />,
        children: [
          { path: PATH.signin, element: <SignIn /> },
          { path: PATH.signup, element: <SignUp /> },
          { path: PATH.resetPassword, element: <ResetPassword /> },
        ],
      },

      profile(),

      { path: "*", element: <Page404 /> },
    ],
  },
];
