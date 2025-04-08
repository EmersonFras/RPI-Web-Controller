import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Weather from './pages/Weather'
import Album from './pages/Album'
import Catan from './pages/Catan'
import Callback from './components/Callback'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path='/weatherApp' element={<Weather />} />
        <Route path='/catan' element={<Catan />} />
        <Route path='/albumDisplay' element={<Album />} />
      </Routes>
    </>
  )
}

export default App
