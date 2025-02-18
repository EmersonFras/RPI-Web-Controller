import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import '../styles/navbar.css'

function Navbar() {
    const { isAuthenticated, checkAuthentication } = useAuth()

    function logout() {
        axios('https://rpi-display.duckdns.org:3000/auth/logout', {
            method: 'POST',
            withCredentials: true
        }).then(() => {checkAuthentication()})
    }

    return (
        <div className="navbar">
            <div className='section'>
                <Link to="/">Home</Link>
                <Link to="/weatherApp">Weather App</Link>
                <Link to="/albumDisplay">Album Display</Link>
            </div>
            <div className='section'>
                {isAuthenticated ? <button onClick={logout}>Log Out</button> : <a href="https://rpi-display.duckdns.org:3000/auth">Login</a>}
            </div>
        </div>
    )
}

export default Navbar