import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Album from './pages/Album'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/weatherApp' element={<Weather />} />
        <Route path='/albumDisplay' element={<Album />} />
      </Routes>
    </>
  )
}

export default App
