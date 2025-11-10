import React, { useState } from "react";
import { regexp, required } from "../../utils/validate";
import Field from "../../components/Field";
import { useForm } from "../../hooks/useForm";
import { courseService } from "../../services/course.service";
import { useScrollTop } from "../../hooks/useScrollTop";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function RegisterPage() {
  useScrollTop();
  const { id } = useParams();

  const { data, loading } = useFetch(() => courseService.getCourseDetail(id))

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
    note: [required()],
  });

  const onSubmit = () => {
    if (validate()) setIsSuccess(true);
    else setIsSuccess(false);
  };

  if (loading) return null
  let { data: detail } = data

  if (!detail) return <div style={{ margin: '100px 0' }}>...Not Found...</div>

  return (
    <main id="main">
      <section className="register-course">
        {isSuccess ? (
          <div class="register-success">
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
            <a href="/" class="btn main rect">
              về trang chủ
            </a>
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
                    <div className="checkcontainer">
                      Hiện có <strong>300 COIN</strong>
                      {/* Giảm giá còn <span><strong>5.800.000 VND</strong>, còn lại 100 COIN</span> */}
                      {/* Cần ít nhất 200 COIN để giảm giá */}
                      <input type="checkbox" defaultChecked="checked" />
                      <span className="checkmark" />
                    </div>
                  )}
                />
                <Field
                  label="Hình thức thanh toán"
                  {...register("payment")}
                  renderInput={(props) => (
                    <div className="select">
                      <div className="head">Chuyển khoản</div>
                      <div className="sub">
                        <a href="#">Chuyển khoản</a>
                        <a href="#">Thanh toán tiền mặt</a>
                      </div>
                    </div>
                  )}
                />
                <Field
                  label="Ý kiến cá nhân"
                  placeholder="Mong muốn cá nhân và lịch bạn có thể học."
                  {...register("note")}
                />
                <button onClick={onSubmit} className="btn main rect">
                  đăng ký
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
