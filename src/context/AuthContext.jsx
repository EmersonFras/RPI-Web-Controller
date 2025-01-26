import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    // A function to check the JWT token from the cookie
    const checkAuthentication = async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/check', { withCredentials: true })
            
            // If the JWT is valid, the backend will send back `isAuthenticated`
            setIsAuthenticated(response.data.isAuthenticated)
        } catch (err) {
            // console.error('Error checking authentication:', err)
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        checkAuthentication() // Check authentication on initial load
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuthentication }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
