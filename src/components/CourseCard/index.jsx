import React from "react";
import { generatePath } from "react-router-dom";
import { PATH } from "../../config/path";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";

export default function CourseCard({
  money,
  long_description,
  short_description,
  title,
  slug,
  id,
  thumbnailUrl,
}) {
  const path = generatePath(PATH.courseDetail, { id });

  return (
    <div className="col-md-4 course">
      <div className="wrap">
        <Link className="cover" to={path}>
          <img src={thumbnailUrl} alt="" />
        </Link>
        <div className="info">
          <Link className="name" to={path}>
            {title}
          </Link>
          <p className="des">{short_description}</p>
        </div>
        <div className="bottom">
          <div className="teacher">
            <div className="avatar">
              <img src="img/avt.png" alt="" />
            </div>
            <div className="name">Truong Nguyen</div>
          </div>
          <Link to={path} className="register-btn">
            Đăng Ký
          </Link>
        </div>
      </div>
    </div>
  );
}

export const CourseCardLoading = () => {
  return (
    <div className="col-md-4 course">
      <div className="wrap">
        <Link className="cover" to="#">
          <Skeleton height={310} />
        </Link>
        <div className="info">
          <Link className="name" to="#">
            <Skeleton height={30} />
          </Link>
          <Skeleton height={80} />
        </div>
        <div className="bottom">
          <div className="teacher">
            <div className="avatar">
              <Skeleton height={36} width={36} shap="circle" />
            </div>
            <div className="name">
              <Skeleton height={24} width={150} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
