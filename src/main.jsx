import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <StrictMode>
                <App />
            </StrictMode>
        </AuthProvider>
    </BrowserRouter>
)
