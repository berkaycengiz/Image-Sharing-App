import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
// import Home from './pages/Home'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
