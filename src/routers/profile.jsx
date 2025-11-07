import ProfileLayout from "../layouts/ProfileLayout";
import { PATH } from "../config/path";
import MyProfile from "../pages/profile/index";
import MyCoin from "../pages/profile/coin";
import MyCourse from "../pages/profile/course";
import MyPayment from "../pages/profile/payment";
import MyProject from "../pages/profile/project";
import PrivateRouter from "../components/PrivateRouter";

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
