import { PATH } from "../config/path";
import { useForm } from "../hooks/useForm";
import { regexp, required } from "../utils/validate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAsync } from "../hooks/useAsync";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { handleError } from "@/utils/handleError";
import { loginThunkAction } from "@/stores/authReducer";
import { useCallback } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

export default function SignIn() {
  const dispatch = useDispatch()
  const { state } = useLocation()
  const navigate = useNavigate();

  const form = useForm({
    username: [required(), regexp('email')],
    password: [required()],
  });
  const login = useCallback(async (data) => {
    try {
      const res = await dispatch(loginThunkAction(data)).unwrap()
      const user = await unwrapResult(res)
      console.log({ user })
    } catch (error) {
      handleError(error)
    }
  })
  const { loading, excute: loginService } = useAsync(login)

  const _onLogin = async () => {
    if (form.validate()) {
      await loginService(form.values);
    }
  }

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
