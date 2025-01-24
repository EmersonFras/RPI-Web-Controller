import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Album from './pages/Album'

function App() {

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/weatherApp">Weather App</Link>
      <Link to="/albumDisplay">Album Display</Link>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/weatherApp' element={<Weather />} />
        <Route path='/albumDisplay' element={<Album />} />
      </Routes>
    </>
  )
}

export default App
