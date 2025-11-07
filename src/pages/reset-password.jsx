import React from "react";
import { PATH } from "../config/path";

export default function ResetPassword() {
  return (
    <main className="auth" id="main">
      <div className="wrap">
        <h2 className="title">Đặt lại mật khẩu</h2>
        <input type="text" placeholder="Email" />
        <div className="btn rect main btn-next">Tiếp theo</div>
      </div>
      <div className="wrap">
        <h2 className="title">Nhập mã code</h2>
        <p style={{ marginBottom: "15px" }}>
          Vui lòng nhập mã code nhận được từ email
        </p>
        <input type="text" placeholder="Code" />
        <p style={{ marginBottom: "15px" }}>
          Nếu chưa nhận được email nào, vui lòng bấm nút{" "}
          <a className="link" href="#">
            Gửi lại
          </a>{" "}
          trong 20 giây
        </p>
        <div className="btn rect main btn-next">Xác nhận</div>
      </div>
      <div className="wrap">
        <h2 className="title">Thay đổi mật khẩu</h2>
        <input type="password" placeholder="Mật khẩu" />
        <input type="password" placeholder="Nhập lại mật khẩu" />
        <button className="btn rect main btn-login">Đổi mật khẩu</button>
      </div>
    </main>
  );
}
