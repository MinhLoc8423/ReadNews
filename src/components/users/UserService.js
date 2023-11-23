import AxiosInstanc from "../helpers/AxiosInstance"

export const register = async (email, password) => {
    try {
        const body = {
            email: email,
            password: password
        }
        const res = await AxiosInstanc().post('/users/register', body)
        console.log('Register response: ', res)
        return res
    } catch (err) {
        console.log('Register error: ', err)
        return err
    }
}
export const login = async (email, password) => {
    try {
        const body = {
            email: email,
            password: password
        }
        const res = await AxiosInstanc().post('/auth/login', body)
        console.log('Login response: ', res)
        return res
    } catch (err) {
        console.log('Login error: ', err)
        return err
    }
}
export const logout = async () => {
    try {
        const res = await AxiosInstanc().get("/auth/logout")
        console.log('Logout response: ', res)
        return res
    } catch (err) {
        console.log('Logout error: ', err)
        return err
    }
}