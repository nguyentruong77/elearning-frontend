//import { useAuth } from "@/components/AuthContext";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { useAsync } from "@/hooks/useAsync";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { userService } from "@/services/user.service";
import { handleError } from "@/utils/handleError";
import { regexp, required, validate } from "@/utils/validate";
import { message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

export default function MyProfile() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const { loading, excute: updateInfoService } = useAsync(userService.updateInfo)
  const { register, values } = useForm({
    name: [
      required(),
    ],
    phone: [
      required(),
      regexp('phone')
    ],
    fb: [
      required(),
      regexp('url')
    ]
  }, user)

  const onSubmit = async () => {
    try {
      if (validate()) {
        const res = await updateInfoService(values)
        dispatch({ type: 'set_user', payload: res.data })
        message.success('Bạn đã cập nhật thông tin tài khoản thành công')
      }

    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className="tab1">
      <Field {...register('name')} placeholder="Nguyễn Văn A" label="Họ và tên" required />
      <Field {...register('phone')} placeholder="0949******" label="Số điện thoại" required />
      <Field {...register('username')} disabled />
      <Field {...register('fb')} placeholder="Facebook url" label="Facebook" required />
      <Button loading={loading} onClick={onSubmit}>LƯU LẠI</Button>
    </div>
  );
}
