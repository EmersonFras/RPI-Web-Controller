import { useAuth } from '../context/AuthContext'
import axios from 'axios'

function Album() {
    const { checkAuthentication } = useAuth()

    function handleClick() {
        checkAuthentication()
    }

    function logout() {
        axios('http://localhost:3000/auth/logout', {
            method: 'POST',
            withCredentials: true
        }).then(() => checkAuthentication())
    }


    return (
        <div>
            <button onClick={handleClick}> API Test</button>
            <button onClick={logout}> logout</button>
        </div>
    )
}

export default Album