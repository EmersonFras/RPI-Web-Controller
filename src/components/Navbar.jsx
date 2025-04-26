import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TiWeatherPartlySunny } from "react-icons/ti"
import { GoHome } from "react-icons/go"
import { BiAlbum } from "react-icons/bi"
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";


function Navbar() {
    const { isAuthenticated, checkAuthentication } = useAuth()
    const [windowSize, setWindowSize] = useState(window.innerWidth)
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

        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    function logout() {
        axios('https://rpi-display.duckdns.org:3000/api/auth/logout', {
            method: 'POST',
            withCredentials: true
        }).then(() => {checkAuthentication()})
    }

    const isMobile = (windowSize <= 768)

    return (
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className='navbar__section navbar__section--left'>
                <Link to="/" className="navbar__link">
                    {isMobile ? <GoHome className="navbar__link--image"/> : "Home" }
                </Link>
            </div>
            <div className='navbar__section navbar__section--center'>
                <Link to="/weatherApp" className="navbar__link">
                    {isMobile ? <TiWeatherPartlySunny className="navbar__link--image" /> : "Weather Display"}
                </Link>
                <Link to="/imageApp" className="navbar__link">Image App</Link>
                {isAuthenticated && 
                    <Link to="/albumDisplay" className="navbar__link">
                        {isMobile ? <BiAlbum className="navbar__link--image"/> : "Album Display"}
                    </Link>
                }
            </div>
            <div className='navbar__section navbar__section--right'>
                {isAuthenticated ? 
                    <button onClick={logout} className="navbar__button navbar__button--logout">
                        {isMobile ? <IoLogOutOutline /> : "Log Out"}
                    </button> : 
                    <a href="https://rpi-display.duckdns.org:3000/api/auth/login" className="navbar__button navbar__button--login">
                        {isMobile ? <IoLogInOutline /> : "Login"}
                    </a>
                }
            </div>
        </div>
    )
}

export default Navbar