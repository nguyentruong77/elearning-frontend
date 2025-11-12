import React, { useState } from "react";
import { PATH } from "../config/path";
import Button from "../components/Button";
import { useForm } from "../hooks/useForm";
import { regexp, required, confirm, minMax } from "../utils/validate";
import { useAsync } from "../hooks/useAsync";
import { userService } from "../services/user.service";
import styled from "styled-components";
import { message } from "antd";
import Input from "../components/Input";
import { LoadingOutlined } from "@ant-design/icons";
import classNames from "classnames";

const ErrorText = styled.p`
  color: red;

`

export default function SignUp() {
  const { excute: signupService, loading } = useAsync(userService.signup)
  const { excute: resentEmailService, loading: resetEmailLoading } = useAsync(userService.resendEmail)
  const [isSignupSuccess, setIsSignupSuccess] = useState(false)
  const { values, validate, register } = useForm({
    name: [
      required()
    ],
    password: [
      required(),
      minMax(6, 10)
    ],
    confirmPassword: [
      required(),
      confirm('password')
    ],
    username: [
      required(),
      regexp('email')
    ]
  });

  const onSubmit = async () => {
    if (validate()) {
      try {
        await signupService(values)
        setIsSignupSuccess(true)
      } catch (err) {
        console.error(err)
        if (err?.response?.data?.message) {
          message.error(err?.response?.data?.message)
        }
      }
    }
  }

  const onReSendEmail = async (ev) => {
    ev.preventDefault()
    try {
      await resentEmailService({
        username: values.username
      })
      message.success('Email kích hoạt đã được gửi thành công.')
    } catch (err) {
      console.error(err)
      if (err?.response?.data?.message) {
        message.error(err?.response?.data?.message)
      }
    }
  }

  return (
    isSignupSuccess ? (
      <main className="auth" id="main">
        <div className="container wrap flex flex-col text-center gap-10">
          <h1 className="text-2xl font-bold">Đăng ký tài khoản thành công</h1>
          <p>Vui lòng kiểm tra email để kích hoạt. Nếu bạn không nhận được email, vui lòng bấm <span className="font-bold">"Gửi lại email kích hoạt"</span> bên dưới.</p>
          <div className="flex justify-center">
            <a onClick={onReSendEmail} href="#" className={classNames('link flex gap-2', { 'opacity-50 pointer-events-none': resetEmailLoading })}>
              {resetEmailLoading && <LoadingOutlined />}
              Gửi lại email kích hoạt</a>
          </div>
        </div>
      </main>
    ) : (
      <main className="auth" id="main">
        <div className="wrap">
          <h2 className="title">Đăng ký</h2>
          <Input {...register('username')} className="mb-5" placeholder="Địa chỉ Email" />
          <Input {...register('name')} className="mb-5" placeholder="Họ và tên" />
          <Input {...register('password')} className="mb-5" placeholder="Mật khẩu" type='password' />
          <Input {...register('confirmPassword')} className="mb-5" placeholder="Nhập lại mật khẩu" type='password' />
          <p className="policy">
            Bằng việc đăng kí, bạn đã đồng ý <a href="#">Điều khoản bảo mật</a>{" "}
            của Spacedev
          </p>
          {/* <button className="btn rect main btn-login">Đăng ký</button> */}
          <Button onClick={onSubmit} className="btn-login" loading={loading} >Đăng ký</Button>
        </div >
      </main >
    )
  );
}
