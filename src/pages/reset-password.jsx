import React, { useState } from "react";
import { PATH } from "../config/path";
import { useAsync } from "@/hooks/useAsync";
import { userService } from "@/services/user.service";
import { useForm } from "@/hooks/useForm";
import { confirm, regexp, required } from "@/utils/validate";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { handleError } from "@/utils/handleError";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
import { setToken } from "@/utils/token";
import { useAuth } from "@/components/AuthContext";

export default function ResetPassword() {

  const [search] = useSearchParams()
  const { getProfile } = useAuth()
  const { excute: sendEmailResetPasswordService, loading: sendEmailResetPasswordLoading } = useAsync(userService.sendEmailResetPassword)
  const { excute: resetPasswordByCodeService, loading: resetPasswordByCodeLoading } = useAsync(userService.resetPasswordByCode)
  const [isSuccess, setIsSuccess] = useState(false)

  const code = search.get('code')

  const resetPasswordForm = useForm({
    password: [
      required()
    ],
    confirmPassword: [
      required(),
      confirm('password')
    ]
  })
  const sendEmailForm = useForm({
    username: [
      required(),
      regexp('email')
    ]
  })

  const onSendEMail = async () => {
    try {
      if (sendEmailForm.validate()) {
        const res = await sendEmailResetPasswordService(sendEmailForm.values)
        message.success(res.message)
        setIsSuccess(true)
      }
    } catch (error) {
      handleError(error)
    }
  }

  const onResetPassword = async () => {
    try {
      if (resetPasswordForm.validate()) {
        const res = await resetPasswordByCodeService({
          password: resetPasswordForm.values.password,
          code: code
        })
        setToken(res.data)
        getProfile()
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <main className="auth" id="main">
      {
        code ? (
          <div className="wrap">
            <h2 className="title">Thay đổi mật khẩu</h2>
            <Input className="mb-5" type="password" placeholder="Mật khẩu" {...resetPasswordForm.register('password')} />
            <Input className="mb-5" type="password" placeholder="Nhập lại mật khẩu" {...resetPasswordForm.register('confirmPassword')} />
            <Button loading={resetPasswordByCodeLoading} onClick={onResetPassword}>Đổi mật khẩu</Button>
          </div>
        ) : (
          isSuccess ? (
            <div className='flex flex-col gap-10 text-center max-w-2x1 m-auto pt-10 pb-10'>
              <h1 className='text-2x1 font-bold'> Gửi mail lấy lại mật khẩu thành công</h1>
              <p> Chúng tôi đã gửi cho bạn email lấy lại mật khẩu, xin vui lòng kiểm tra email</p>
            </div>
          ) : (
            <div className="wrap">
              <h2 className="title">Đặt lại mật khẩu</h2>
              <Input className="mb-5" placeholder="Email" {...sendEmailForm.register('username')} />
              <Button loading={sendEmailResetPasswordLoading} onClick={onSendEMail}>Tiếp theo</Button>
            </div>
          )
        )
      }
    </main >
  );
}
{/* <div className="wrap">
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
      </div> */}
