import React, { useEffect, useState } from "react";
import ListCourse from "../../components/ListCourse";
import { useScrollTop } from "../../hooks/useScrollTop";
import { courseService } from "../../services/course.service";
import CourseCard, { CourseCardLoading } from "../../components/CourseCard";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "@/hooks/useQuery";

export default function Course() {
  const { data: { data: courses = [] } = {}, loading } = useQuery({
    queryFn: () => courseService.getCourse(),
    queryKey: 'courses-list',
    cacheTime: 10000
  })
  //const { data: courses, loading } = useFetch(() => courseService.getCourse())
  useScrollTop()
  return (
    <main className="homepage" id="main">
      <section className="section-1">
        <div className="container">
          <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
          <p className="top-des">
            Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt động kinh doanh hay chỉ đơn giản là
            muốn khám phá thế giới, hãy chọn lộ trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của
            bạn.
          </p>
          <div className="textbox" style={{ marginTop: '100px' }}>
            <h3 className="sub-title">KHÓA HỌC</h3>
            <h2 className="main-title">OFFLINE</h2>
          </div>
          <div className="flex justify-between items-center mt-10 mb-10">
            <div className="category">
              <a href="#" className="item active">Cất cả</a>
              <a href="#" className="item">Frontend</a>
              <a href="#" className="item">Backend</a>
              <a href="#" className="item">UI/UX</a>
              <a href="#" className="item">Devops</a>
            </div>
            <div className="flex">
              <div className="input-search">
                <input defaultValue="Reactjs" />
                <button>Tìm kiếm</button>
              </div>
            </div>
          </div>
          <div className="list row">
            {loading
              ? Array.from(Array(6)).map((_, i) => (
                <CourseCardLoading key={i} />
              ))
              : courses.data.map((e) => <CourseCard key={e.key} {...e} />)}
          </div>
          <div className="flex justify-end mt-10">
            <div className="paginate">
              <a href="#" className="prev">Trang trước</a>
              <a href="#" className="item">1</a>
              <a href="#" className="item">2</a>
              <a href="#" className="item active">3</a>
              <a href="#" className="item">4</a>
              <a href="#" className="item">5</a>
              <a href="#" className="next">Trang sau</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
