import React, { createContext, useState } from 'react'
import { login, logout } from './UserService'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const { children } = props
    const [user, setUser] = useState(null)

    const onLogin = async (email, password) => {
        try {
            const result = await login(email, password)
            if (result.statusCode == 200) {
                setUser(result.data.user)
                await AsyncStorage.setItem('token', result.data.token)
                return true
            }
        } catch (error) {
            console.log('login err: ', error)
        }
        return false
    }

    const onLogout = async () => {
        try {
            const result = await logout()
            if (result.statusCode == 200) {
                setUser(null)
                await AsyncStorage.setItem('token', "")
                console.log('logout ok')
            }
            return true
        } catch (error) {
            console.log('logout err: ', error)
        }
        return false
    }
    
    return (
        <UserContext.Provider value={{ user, setUser, onLogin, onLogout }}>
            {children}
        </UserContext.Provider>
    )
}