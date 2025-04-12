import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function Callback() {
    const navigate = useNavigate()
    const { checkAuthentication } = useAuth()


    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code')

        axios.get(
            'https://rpi-display.duckdns.org:3000/api/auth/callback', { 
            params: { code }, // Send the authorization code to the backend
            withCredentials: true  // Ensures cookies are included
        })
        .then((response) => {
            if (response.data.success) {
                checkAuthentication()
                navigate('/') // Redirect to home
            } else {
                console.error('Callback failed', response.data.error)
            }
        })
        .catch((error) => {
            console.error('Error during callback:', error)
        })
    }, [navigate])

    return <div>Processing...</div>
}
