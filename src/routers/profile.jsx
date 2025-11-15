import { lazy } from "react";
import { PATH } from "../config/path";

const ProfileLayout = lazy(() => import("../layouts/ProfileLayout"))
const MyProfile = lazy(() => import("../pages/profile/index"))
const MyCoin = lazy(() => import("../pages/profile/coin"))
const MyCourse = lazy(() => import("../pages/profile/course"))
const MyPayment = lazy(() => import("../pages/profile/payment"))
const MyProject = lazy(() => import("../pages/profile/project"))
const PrivateRouter = lazy(() => import("../components/PrivateRouter"))

export const profile = (user) => {
  return {
    element: <PrivateRouter user={user} redirect={PATH.signin} />,
    children: [
      {
        element: <ProfileLayout user={user} />,
        path: PATH.profile.index,
        children: [
          {
            element: <MyProfile />,
            index: true,
          },
          {
            element: <MyCoin />,
            path: PATH.profile.coin,
          },
          {
            element: <MyCourse />,
            path: PATH.profile.course,
          },
          {
            element: <MyPayment />,
            path: PATH.profile.payment,
          },
          {
            element: <MyProject />,
            path: PATH.profile.project,
          },
        ],
      },
    ],
  };
};
