import React, { useState } from "react";
import { courseService } from "../../services/course.service";
import CourseCard from "../CourseCard";

export default function ListCourse() {
  const [courses, setCourses] = useState(() => {
    return courseService.getCourseTemp();
  });
  return (
    <section className="section-1">
      <div className="container">
        <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
        <p className="top-des">
          Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt động
          kinh doanh hay chỉ đơn giản là muốn khám phá thế giới, hãy chọn lộ
          trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của bạn.
        </p>
        <div className="textbox" style={{ marginTop: "100px" }}>
          <h3 className="sub-title">KHÓA HỌC</h3>
          <h2 className="main-title">OFFLINE</h2>
        </div>
        <div className="list row">
          {courses.map((item) => (
            <CourseCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
