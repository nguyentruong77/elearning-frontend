import Field from "../components/Field";
import { required, regexp } from "../utils/validate";
import { useForm } from "../hooks/useForm";
import { organizationService } from "../services/organization.service";
import { message } from "antd";
import { useState } from "react";
import Button from "../components/Button";
import { useAsync } from "../hooks/useAsync";

export default function ContactPage() {
  const { validate, register, values, reset } = useForm({
    name: [required()],
    phone: [required("please enter phone number!"), regexp("phone")],
    email: [required(), regexp("email", "Please enter email address!")],
    website: [regexp("url", "Please enter a valid website URL!")],
    content: [required()],
    title: [required()],
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const { excute, loading } = useAsync(organizationService.contact)

  const onSubmit = async (ev) => {
    try {
      ev.preventDefault();
      if (validate()) {
        const res = await excute(values);
        if (res.data.success) {
          reset();
          message.success(
            "Thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể."
          );
          setIsSuccess(true);
        }
      } else {
        console.log("validate error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main id="main" className="register-course">
        <section className="section-1 wrap container">
          {
            isSuccess ?
              <>
                <h2 className="main-title">Liên hệ thành công</h2>
                <p className="top-des">
                  Thông tin liên hệ của bạn đã được gửi, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất, xin cảm ơn!
                </p>
                <div className="flex justify-center">
                  <a className="link mt-10" href="#" onClick={(ev) => {
                    ev.preventDefault()
                    setIsSuccess(false)
                  }}>Tiếp tục liên hệ</a>

                </div>
              </> :
              <>
                <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
                <p className="top-des">
                  Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau
                  tạo ra những sản phẩm giá trị, cũng như việc hợp tác với các đối tác
                  tuyển dụng và công ty trong và ngoài nước.
                </p>
                <form className="form" onSubmit={onSubmit}>
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
                    label="Website"
                    placeholder="Đường dẫn website http://"
                    {...register("website")}
                  />
                  <Field
                    label="Tiêu đề"
                    placeholder="Tiêu đề liên hệ"
                    required
                    {...register("title")}
                  />
                  <Field
                    label="Nội dung"
                    placeholder="Nội dung..."
                    required
                    {...register("content")}
                    renderInput={(props) => (
                      <textarea {...props} cols={30} rows={10} />
                    )}
                  />
                  <Button loading={loading} >Đăng ký</Button>
                </form>

              </>
          }

          {/* <div class="main-sub-title">liên hệ</div> */}
        </section>
        {/* <div class="register-success">
                <div class="contain">
                    <div class="main-title">đăng ký thành công</div>
                    <p>
                        <strong>Chào mừng Truong Nguyen đã trở thành thành viên mới của Spacedev Team.</strong> <br>
                        Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook
                        hoặc số điện thoại của bạn.
                    </p>
                </div>
                <a href="/" class="btn main rect">về trang chủ</a>
            </div> */}
      </main>
    </>
  );
}
