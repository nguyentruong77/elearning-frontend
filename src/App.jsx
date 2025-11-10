import { useRoutes } from "react-router-dom";
import { routers } from "./routers";
//import './assets/css/tailwind.css'
import './assets/css/custom.css'

function App() {
  //let avt = courseService.getCourseDetail(5).thumbnailUrl;
  // const [user, setUser] = useState(() => {
  //   try {
  //     return JSON.parse(localStorage.getItem("user"));
  //   } catch (err) {
  //     return null;
  //   }
  // });
  // const login = () => {
  //   setUser({
  //     name: "Nguyen Ich Truong",
  //     avatar: avt,
  //   });
  // };

  // const logout = () => {
  //   setUser();
  // };

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  const element = useRoutes(routers);

  return (
    <>
      {element}
      {/* <Routes>
        <Route
          element={<MainLayout user={user} login={login} logout={logout} />}
        >
          <Route index element={<Home />} />
          <Route path={PATH.contact} element={<Contact />} />
          <Route path={PATH.course}>
            <Route index element={<Course />} />
            <Route path={PATH.courseDetail} element={<CourseDetail />} />
          </Route>
          <Route path={PATH.courseRegister} element={<RegisterPage />} />
          <Route path={PATH.team} element={<Team />} />
          <Route path={PATH.project} element={<Project />} />
          <Route path={PATH.faq} element={<FAQ />} />
          <Route path={PATH.payment} element={<Payment />} />
          <Route path={PATH.coin} element={<Coin />} />
          <Route element={<AuthRouter user={user} redirect={PATH.home} />}>
            <Route
              path={PATH.signin}
              element={<SignIn login={login} user={user} />}
            />
            <Route path={PATH.signup} element={<SignUp user={user} />} />
            <Route
              path={PATH.resetPassword}
              element={<ResetPassword user={user} />}
            />
          </Route>
          <Route element={<PrivateRouter user={user} redirect={PATH.signin} />}>
            <Route
              path={PATH.profile.index}
              element={<ProfileLayout user={user} />}
            >
              <Route index element={<MyProfile />} />
              <Route path={PATH.profile.course} element={<MyCourse />} />
              <Route path={PATH.profile.payment} element={<MyPayment />} />
              <Route path={PATH.profile.project} element={<MyProject />} />
              <Route path={PATH.profile.coin} element={<MyCoin />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
