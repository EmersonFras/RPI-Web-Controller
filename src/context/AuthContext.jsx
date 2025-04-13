import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const location = useLocation();
    
    // A function to check the JWT token from the cookie
    const checkAuthentication = async () => {
        try {
            const response = await axios.get('https://rpi-display.duckdns.org:3000/api/auth/check', 
                { withCredentials: true })
            
            // If the JWT is valid, the backend will send back `isAuthenticated`
            setIsAuthenticated(response.data.isAuthenticated)
        } catch {
            // console.error('Error checking authentication:', err)
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
