import Skeleton from "@/components/Skeleton";
import { PATH } from "@/config/path";
import { useFetch } from "@/hooks/useFetch";
import { courseService } from "@/services/course.service";
import moment from "moment";
import React from "react";
import { generatePath, Link } from "react-router-dom";

export default function MyCourse() {
  const { loading, data: courses } = useFetch(courseService.getMyCourse)
  if (true) return Array.from(Array(5).map((_, i) => <div key={i} className="tab2 mb-5"><Skeleton height={250} /></div>))
  return <div className="tab2">
    {
      courses.length === 0 && <p>Bạn hiện tại không có đăng ký khóa học nào, vui lòng đăng ký khóa học rồi quay trở lại</p>
    }
    {
      courses.map(e => {
        const coursePath = generatePath(PATH.courseDetail, { id: e.course.id })
        return <div className="item" key={e.course.id}>
          <div className="cover">
            <img src={e.course.thumbnailUrl} alt="" />
          </div>
          <div className="info">
            <Link to={coursePath} className="name">
              {e.course.title}
            </Link>
            <div className="date">Khai giảng ngày {moment(e.course.title).format('DD/MM/YYYY')}</div>
            <div className="row">
              <div>
                <img src="/img/clock.svg" alt="" className="icon" />
                {e.total_hours} giờ
              </div>
              <div>
                <img src="/img/play.svg" alt="" className="icon" />
                {e.video} video
              </div>
              <div>
                <img src="/img/user.svg" alt="" className="icon" />
                {e.student} học viên
              </div>
            </div>
            <div className="process">
              <div className="line">
                <div className="rate" style={{ width: `${e.process}%` }} />
              </div>
              {e.process}%
            </div>
            <Link to={coursePath} className="btn overlay round btn-continue">Tiếp tục học</Link>
          </div>
        </div>
      })
    }
  </div>
}
