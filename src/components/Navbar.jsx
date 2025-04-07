import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { useEffect, useState } from 'react'


function Navbar() {
    const { isAuthenticated, checkAuthentication } = useAuth()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {

        // Sets class name on navbar based on scroll position
        const handleScroll = () => {
            // 50 is the scroll threshold
            // Value was chosen initially, can be changed later
            if (window.scrollY > 50) {
              setIsScrolled(true)
            } else {
              setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    function logout() {
        axios('https://rpi-display.duckdns.org:3000/auth/logout', {
            method: 'POST',
            withCredentials: true
        }).then(() => {checkAuthentication()})
    }

    return (
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className='navbar__section navbar__section--left'>
                <Link to="/" className="navbar__link">Home</Link>
            </div>
            <div className='navbar__section navbar__section--center'>
                <Link to="/weatherApp" className="navbar__link">Weather App</Link>
                {isAuthenticated && <Link to="/albumDisplay" className="navbar__link">Album Display</Link>}
            </div>
            <div className='navbar__section navbar__section--right'>
                {isAuthenticated ? <button onClick={logout} className="navbar__button navbar__button--logout">Log Out</button> : <a href="https://rpi-display.duckdns.org:3000/auth" className="navbar__button navbar__button--login">Login</a>}
            </div>
        </div>
    )
}

export default Navbar