import React, { useEffect, useState } from "react";
import { regexp, required } from "../../utils/validate";
import Field from "../../components/Field";
import { useForm } from "../../hooks/useForm";
import { courseService } from "../../services/course.service";
import { useScrollTop } from "../../hooks/useScrollTop";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Select } from "@/components/Select";
import { Checkbox } from "@/components/Checkbox";
import { PATH } from "@/config/path";
import { message } from "antd";
import { useAsync } from "@/hooks/useAsync";
import { handleError } from "@/utils/handleError";
import Button from "@/components/Button";
import { useSelector } from "react-redux";

export default function RegisterPage() {
  useScrollTop();
  const { id } = useParams();
  const pathName = useLocation()
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      message.warning("Vui lòng đăng nhập trước khi đăng ký khóa học")
      navigate(PATH.signin, { state: { redirect: pathName } })
    }
  }, [user])
  const { data, loading } = useFetch(() => courseService.getCourseDetail(id))
  const { excute: courseRegisterService, registerLoading } = useAsync(courseService.register)
  const [isSuccess, setIsSuccess] = useState(false);
  const { validate, register, values } = useForm({
    name: [required()],
    phone: [required("please enter phone number!"), regexp("phone")],
    email: [required(), regexp("email", "Please enter email address!")],
    website: [
      regexp(
        /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/,
        "Please enter a valid Facebook URL!"
      ),
    ],
    payment: [
      required()
    ],
    note: [required()],
  }, {
    email: user.username,
    name: user.name,
    fb: user.fb,
    phone: user.phone
  });

  const onSubmit = async () => {
    if (validate()) {
      try {
        const res = await courseRegisterService(id, values)
        message.success(res?.message)
        navigate(PATH.profile.course)
      } catch (error) {
        handleError(error)
      }
    }
    else setIsSuccess(false);
  };

  if (loading) return null
  let { data: detail } = data

  if (!detail) return <div style={{ margin: '100px 0' }}>...Not Found...</div>

  return (
    <main id="main">
      <section className="register-course">
        {isSuccess ? (
          <div class="register-success flex flex-col items-center gap-10 text-center max-w-2xl" style={{ margin: '40px auto' }}>
            <div class="contain">
              <div class="main-title">đăng ký thành công</div>
              <p>
                <strong>
                  Chào mừng Truong Nguyen đã trở thành thành viên mới của
                  Spacedev Team.
                </strong>{" "}
                <br />
                Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>,
                chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook hoặc
                số điện thoại của bạn.
              </p>
            </div>
            <Link to={PATH.profile.course} class="btn main rect">
              về khóa học của tôi
            </Link>
          </div>
        ) : (
          <div className="container">
            <div className="wrap container">
              <div className="main-sub-title">ĐĂNG KÝ</div>
              <h1 className="main-title">{detail.title}</h1>
              <div className="main-info">
                <div className="date">
                  <strong>Khai giảng:</strong> 15/11/2020
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
                <div className="time">
                  <strong>Học phí:</strong>{" "}
                  {detail.money.toLocaleString("vi-VN")} VND
                </div>
              </div>
              <div className="form">
                <Field
                  label="Họ và tên"
                  placeholder="Họ và tên bạn"
                  required
                  {...register("name")}
                />
                <Field
                  label="Số điện thoại"
                  placeholder="Số điện thoại"
                  required
                  {...register("phone")}
                />
                <Field
                  label="Email"
                  placeholder="Email của bạn"
                  required
                  {...register("email")}
                />
                <Field
                  label="URL Facebook"
                  placeholder="Đường dẫn website http://"
                  {...register("fb")}
                />
                <Field
                  label="Sử dụng COIN"
                  {...register("coin")}
                  renderInput={(props) => (
                    <Checkbox {...props}>
                      Hiện có <strong>300 COIN</strong>
                    </Checkbox>
                  )}
                />
                <Field
                  label="Hình thức thanh toán"
                  {...register("payment")}
                  renderInput={(props) => (
                    <Select
                      {...props}
                      placholder="Hình thức thanh toán"
                      options={[
                        { value: 'chuyen-khoan', label: 'Chuyển khoản' },
                        { value: 'thanh-toan-tien-mat', label: 'Thanh toán tiền mặt' },
                      ]} />
                  )}
                />
                <Field
                  label="Ý kiến cá nhân"
                  placeholder="Mong muốn cá nhân và lịch bạn có thể học."
                  {...register("note")}
                />
                <Button loading={registerLoading} onClick={onSubmit}>
                  đăng ký
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
