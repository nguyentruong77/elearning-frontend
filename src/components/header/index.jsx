import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PATH } from "../../config/path";
import { useAuth } from "../AuthContext";
import { avatarDefault } from "../../config/index";

export default function Header() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth()
  useEffect(() => {
    onCloseMenu();
  }, [pathname]);

  const onToggleMenu = () => {
    document.body.classList.toggle("menu-is-show");
  };

  const onCloseMenu = () => {
    document.body.classList.remove("menu-is-show");
  };

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
                  <a href="./profile.html" className="info">
                    <div className="name">{user.name}</div>
                    <div className="avatar">
                      <img src={user.avatar ?? avatarDefault} alt="" />
                    </div>
                  </a>
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
          <li>
            <Link href={PATH.signin}>Đăng ký / Đăng nhập</Link>
          </li>
          <li>
            <a href={PATH.profile.index} className="account">
              <div className="avatar">
                <img src={avatarDefault} alt="" />
              </div>
              <div className="name">Nguyen Ich Truong</div>
            </a>
          </li>
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
