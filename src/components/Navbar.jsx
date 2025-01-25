import { Link } from 'react-router-dom'
import '../styles/navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/weatherApp">Weather App</Link>
            <Link to="/albumDisplay">Album Display</Link>
            <a href="http://localhost:3000/login">Login</a>
        </div>
    )
}

export default Navbar