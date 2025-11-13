import { PATH } from "../config/path";
import { useForm } from "../hooks/useForm";
import { regexp, required } from "../utils/validate";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAsync } from "../hooks/useAsync";
import { message } from "antd";

export default function SignIn() {
  const { login } = useAuth()
  const { loading, excute: loginService } = useAsync(login)
  const navigate = useNavigate();
  const form = useForm({
    username: [required(), regexp('email')],
    password: [required()],
  });
  const _onLogin = async () => {
    if (form.validate()) {
      try {
        const res = await loginService(form.values)
        navigate(PATH.home);
      } catch (err) {
        console.error(err)
        if (err?.response?.data?.message) {
          message.error(err?.response?.data?.message)
        }
      }
    }
  };

  return (
    <main className="auth" id="main">
      <div className="wrap">
        {/* login-form */}
        <div className="ct_login">
          <h2 className="title">Đăng nhập</h2>
          <Input {...form.register('username')} className="mb-5" placeholder="Email / Số điện thoại" />
          <Input {...form.register('password')} type="password" className="mb-5" placeholder="Mật khẩu" />
          <div className="remember">
            <label className="btn-remember">
              <div>
                <input type="checkbox" />
              </div>
              <p>Nhớ mật khẩu</p>
            </label>
            <a href="#" className="forget">
              Quên mật khẩu?
            </a>
          </div>
          <Button loading={loading} onClick={_onLogin} className="btn rect main btn-login">đăng nhập</Button>
          <div className="text-register" style={{}}>
            <span>Nếu bạn chưa có tài khoản?</span>{" "}
            <Link className="link" to={PATH.signup}>
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
