import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import '../styles/navbar.css'

function Navbar() {
    const { isAuthenticated, checkAuthentication } = useAuth()

    function logout() {
        axios('http://localhost:3000/auth/logout', {
            method: 'POST',
            withCredentials: true
        }).then(() => checkAuthentication())
    }

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/weatherApp">Weather App</Link>
            <Link to="/albumDisplay">Album Display</Link>
            {isAuthenticated ? <button onClick={logout}>Log Out</button> : <a href="http://localhost:3000/auth">Login</a>}
        </div>
    )
}

export default Navbar