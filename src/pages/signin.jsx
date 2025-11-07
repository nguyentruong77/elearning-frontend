import React from "react";
import { PATH } from "../config/path";
import { useForm } from "../hooks/useForm";
import { required } from "../utils/validate";
import Field from "../components/Field";
import { useNavigate } from "react-router-dom";

export default function SignIn({ login }) {
  const navigate = useNavigate();
  const { values, register, validate } = useForm({
    username: [required()],
    password: [required()],
  });
  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log(validate());
    if (validate()) {
      login();
      navigate(PATH.home);
    }
  };

  return (
    <main className="auth" id="main">
      <div className="wrap">
        {/* login-form */}
        <form onSubmit={onSubmit} className="ct_login">
          <h2 className="title">Đăng nhập</h2>
          <Field
            placeholder="Email / Số điện thoại"
            {...register("username")}
          ></Field>
          <Field
            placeholder="Mật khẩu"
            type={"password"}
            {...register("password")}
          ></Field>
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
          <button className="btn rect main btn-login">đăng nhập</button>
          <div className="text-register" style={{}}>
            <span>Nếu bạn chưa có tài khoản?</span>{" "}
            <a className="link" href="#">
              Đăng ký
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
