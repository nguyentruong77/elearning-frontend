import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../config/path";
import { avatarDefault } from "../../config/index";
import { useDispatch } from "react-redux";
import { logoutThunkAction } from "@/stores/authReducer";
import { message } from "antd";
import { useSelector } from "react-redux";
import { handleError } from "@/utils/handleError";

export default function Header() {
  const { pathname } = useLocation();
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    onCloseMenu();
  }, [pathname]);

  const onToggleMenu = () => {
    document.body.classList.toggle("menu-is-show");
  };

  const onCloseMenu = () => {
    document.body.classList.remove("menu-is-show");
  };

  const logout = async () => {
    try {
      await dispatch(logoutThunkAction()).unwrap()
      message.success('Đăng xuất thành công')
      navigate(PATH.home)
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <>
      <header id="header">
        <div className="wrap">
          <div className="menu-hambeger" onClick={onToggleMenu}>
            <div className="button">
              <span />
              <span />
              <span />
            </div>
            <span className="text">menu</span>
          </div>
          <Link to={PATH.home} className="logo">
            <img src="/img/logo.svg" alt="" />
            <h1>Spacedev</h1>
          </Link>
          <div className="right">
            {user ? (
              <div className="have-login">
                <div className="account">
                  <Link to={PATH.profile.index} className="info">
                    <div className="name">{user.name}</div>
                    <div className="avatar">
                      <img src={user.avatar ?? avatarDefault} alt="" />
                    </div>
                  </Link>
                </div>
                <div className="hamberger"></div>
                <div className="sub">
                  <Link to={PATH.profile.course}>Khóa học của tôi</Link>
                  <Link to={PATH.profile.index}>Thông tin tài khoản</Link>
                  <Link to={PATH.signin} onClick={logout}>
                    Đăng xuất
                  </Link>
                </div>
              </div>
            ) : (
              <div className="not-login bg-none">
                <Link to={PATH.signin} className="btn-register">
                  Đăng nhập
                </Link>
                <Link to={PATH.signup} className="btn main btn-open-login">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="progress" />
      </header>
      <nav className="nav">
        <ul>
          {user && (
            <li>
              <a href={PATH.profile.index} className="account">
                <div className="avatar">
                  <img src={avatarDefault} alt="" />
                </div>
                <div className="name">{user.name}</div>
              </a>
            </li>
          )}
          <li>
            <NavLink to={PATH.home}>Trang chủ</NavLink>
          </li>
          <li>
            <NavLink to={PATH.team}>Spacedev Team</NavLink>
          </li>
          <li>
            <NavLink to={PATH.course}>Khóa Học</NavLink>
          </li>
          <li>
            <NavLink to={PATH.project}>Dự Án</NavLink>
          </li>
          <li>
            <NavLink to={PATH.contact}>Liên hệ</NavLink>
          </li>
        </ul>
      </nav>
      <div className="overlay_nav" onClick={onToggleMenu} />
    </>
  );
}
