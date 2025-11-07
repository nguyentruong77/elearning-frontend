const PROFILE_PATH = "/profile";
const COURSE_PATH = "/course";

export const PATH = {
  home: "/",
  team: "/team",
  course: COURSE_PATH,
  courseDetail: COURSE_PATH + "/:id",
  courseRegister: "/register" + "/:id",
  project: "/project",
  coin: "/coin",
  payment: "/payment",
  contact: "/contact",
  faq: "/faq",
  signin: "/signin",
  signup: "/signup",
  resetPassword: "/reset-password",
  profile: {
    index: PROFILE_PATH,
    course: PROFILE_PATH + "/course",
    coin: PROFILE_PATH + "/coin",
    payment: PROFILE_PATH + "/payment",
    project: PROFILE_PATH + "/project",
  },
};
