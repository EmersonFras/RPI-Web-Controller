import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/navbar.css'

function Navbar() {
    const { isAuthenticated } = useAuth()

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/weatherApp">Weather App</Link>
            <Link to="/albumDisplay">Album Display</Link>
            {isAuthenticated ? <div>Logged In</div> : <a href="http://localhost:3000/auth">Login</a>}
        </div>
    )
}

export default Navbar