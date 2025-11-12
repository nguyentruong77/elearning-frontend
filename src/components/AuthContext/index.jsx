import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { message } from "antd";
import { clearToken, clearUser, getUser, setToken, setUser } from "../../utils/token";
import { userService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../config/path";

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, _setUser] = useState(getUser)
    useEffect(() => {
        setUser(user || null)
    }, [user])
    const login = async (data) => {
        try {
            const res = await authService.login(data)
            if (res.data) {
                setToken(res.data)
                const user = await userService.getProfile()
                _setUser(user.data)
                setUser(user.data)
                message.success('Đăng nhập tài khoản thành công!')
                navigate(PATH.profile.index)
            }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const logout = () => {
        _setUser(null)
        clearToken()
        clearUser()
        message.success('Đăng xuất tài khoản thành công')
    }

    return <AuthContext.Provider value={{ user, login, logout, setUser: _setUser }}>{children}</AuthContext.Provider>
}