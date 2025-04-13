import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axiosPrivate from '../api/axiosPrivate'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const location = useLocation();
    
    // A function to check the JWT token from the cookie
    const checkAuthentication = async () => {
        try {
            const response = await axiosPrivate.get('/auth/check')
            setIsAuthenticated(response.data.isAuthenticated)
        } catch (err) {
            console.error('Error checking authentication:', err)
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        if (!location.pathname.startsWith('/callback')) {
            checkAuthentication() // Check authentication on initial load
        }
    }, [location])

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuthentication }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
