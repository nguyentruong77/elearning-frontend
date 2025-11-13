import { generatePath, useParams } from "react-router-dom";
import { courseService } from "../../services/course.service";
import { useScrollTop } from "../../hooks/useScrollTop";
import { PATH } from "../../config/path";
import { useFetch } from "../../hooks/useFetch";
import CourseCard from "../../components/CourseCard";
import Skeleton from "../../components/Skeleton";
import Accordion from "../../components/Accordion";
import moment from "moment";
import { useMemo, useState } from "react";
import Teacher from "@/components/Teacher";
import { Modal } from "@/components/Modal";

export default function CourseDetail() {
  const { id } = useParams();
  useScrollTop([id]);
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false)
  const { data, loading } = useFetch(() => courseService.getCourseDetail(id), [id])
  const { data: related } = useFetch(() => courseService.getRelative(id), [id])
  const detail = data?.data
  const { pathCourse, startTime } = useMemo(() => {
    if (detail) {
      const pathCourse = generatePath(PATH.courseRegister, { id });
      const startTime = moment(detail.opening_time).format('DD/MM/YYYY')
      return {
        pathCourse, startTime
      }
    }
  }, [detail])

  if (loading) {
    return (
      <>
        <main className="course-detail" id="main">
          <section className="banner style2" style={{ "--background": "#cde6fb" }}>
            <div className="container">
              <div className="info">
                <h1><Skeleton width={500} height={64} /></h1>
                <div className="row">
                  <div className="date">
                    <Skeleton width={200} height={24} />
                  </div>
                  <div className="time">
                    <Skeleton width={200} height={24} />
                  </div>
                </div>
                <Skeleton style={{ marginTop: 40 }} width={150} height={46} />
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }
  return (
    <main className="course-detail" id="main">
      <section className="banner style2" style={{ "--background": "#cde6fb" }}>
        <div className="container">
          <div className="info">
            <h1>{detail.title}</h1>
            <div className="row">
              <div className="date">
                <strong>Khai giảng:</strong> {startTime}
              </div>
              <div className="time">
                <strong>Thời lượng:</strong> {detail.count_video} buổi
              </div>
            </div>
            <a
              className="btn white round"
              style={{ "--color-btn": "#70b6f1" }}
              href={pathCourse}
            >
              đăng ký
            </a>
          </div>
        </div>
        <div className="bottom">
          <div className="container">
            <div className="video" onClick={() => setIsOpenVideoModal(true)}>
              <div className="icon">
                <img src="/img/play-icon-white.png" alt="" />
              </div>{" "}
              <Modal maskeCloseable visibile={isOpenVideoModal} onCancel={() => setIsOpenVideoModal(false)}>
                <iframe width="800px" height="450px" src="https://www.youtube.com/embed/OyRmce1F7-8?si=nh9RafnzGvuE27oH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </Modal>
              <span>giới thiệu</span>
            </div>
            <div className="money">{detail.money.toLocaleString("vi-VN")}</div>
          </div>
        </div>
      </section>
      <section className="section-2">
        <div className="container">
          <p className="des">{detail.short_description}</p>
          <h2 className="title">giới thiệu về khóa học</h2>
          <div className="cover">
            <img src="/img/course-detail-img.png" alt="" />
          </div>
          <h3 className="title">nội dung khóa học</h3>
          <Accordion.Group>
            {
              detail.content.map((e, i) => <Accordion key={i} date={i + 1} {...e}>{e.content}</Accordion>)
            }
          </Accordion.Group>
          <h3 className="title">yêu cầu cần có</h3>
          <div className="row row-check">
            {
              detail.required.map((e, i) => <div key={i} className="col-md-6">{e.content}</div>)
            }
          </div>
          <h3 className="title">hình thức học</h3>
          <div className="row row-check">
            {
              detail.benefits.map((e, i) => <div key={i} className="col-md-6">{e.content}</div>)
            }
          </div>
          <h3 className="title">
            <div className="date-start">lịch học</div>
            <div className="sub">
              *Lịch học và thời gian có thể thống nhất lại theo số đông học
              viên.
            </div>
          </h3>
          <p>
            <strong>Ngày bắt đầu: </strong> {startTime} <br />
            <strong>Thời gian học: </strong> {detail.schedule}
          </p>
          <h3 className="title">Người dạy</h3>
          <div className="teaches">
            <Teacher {...detail.teacher} />
          </div>
          {
            detail.mentor.length > 0 && <>
              <h3 className="title">Người hướng dẫn</h3>
              <div className="teaches">
                {
                  detail.mentor.map((e) => <Teacher key={e.id} {...e} />)
                }
              </div>
            </>
          }
          <div className="bottom">
            <div className="user">
              <img src="/img/user-group-icon.png" alt="" /> {detail.number_student_default} bạn đã đăng ký
            </div>
            <a className="btn main btn-register round" href={pathCourse}>đăng ký</a>
            <div className="btn-share btn overlay round btn-icon">
              <img src="/img/facebook.svg" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="section-3">
        <div className="container">
          <div className="textbox">
            <h3 className="sub-title">DỰ ÁN</h3>
            <h2 className="main-title">THÀNH VIÊN</h2>
          </div>
          <div className="list row">
            <div className="col-md-4 course">
              <div className="wrap">
                <a href="#" className="cover">
                  <img src="/img/img.png" alt="" />
                </a>
                <div className="info">
                  <a className="name" href="#">
                    React JS
                  </a>
                  <p className="des">
                    One of the best corporate fashion brands in Sydney
                  </p>
                </div>
                <div className="bottom">
                  <div className="teacher">
                    <div className="avatar">
                      <img src="/img/avt.png" alt="" />
                    </div>
                    <div className="name">Truong Nguyen</div>
                  </div>
                  <div className="register-btn">Đăng Ký</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 course">
              <div className="wrap">
                <a href="#" className="cover">
                  <img src="/img/img2.png" alt="" />
                </a>
                <div className="info">
                  <a className="name" href="#">
                    Animation
                  </a>
                  <p className="des">
                    One of the best corporate fashion brands in Sydney
                  </p>
                </div>
                <div className="bottom">
                  <div className="teacher">
                    <div className="avatar">
                      <img src="/img/avt.png" alt="" />
                    </div>
                    <div className="name">Truong Nguyen</div>
                  </div>
                  <div className="register-btn">Đăng Ký</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 course">
              <div className="wrap">
                <a href="#" className="cover">
                  <img src="/img/img3.png" alt="" />
                </a>
                <div className="info">
                  <a className="name" href="#">
                    Lập trình Nodejs
                  </a>
                  <p className="des">
                    One of the best corporate fashion brands in Sydney
                  </p>
                </div>
                <div className="bottom">
                  <div className="teacher">
                    <div className="avatar">
                      <img src="/img/avt.png" alt="" />
                    </div>
                    <div className="name">Truong Nguyen</div>
                  </div>
                  <div className="register-btn">Đăng Ký</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-4">
        <div className="container">
          <div className="textbox">
            <h3 className="sub-title">Khóa học</h3>
            <h2 className="main-title">Liên quan</h2>
          </div>
          <div className="list row">
            {
              related && related?.data.map(e => <CourseCard key={e.id} {...e} />)
            }
          </div>
        </div>
      </section>
    </main>
  );
}
