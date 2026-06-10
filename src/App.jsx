import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Materials from './pages/Materials'
import Chat from './pages/Chat'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ marginLeft: '60px', flex: 1, minHeight: '100vh', background: '#f8fafc' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/materials" />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App