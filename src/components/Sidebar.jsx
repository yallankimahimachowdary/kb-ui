import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div style={{
      width: '60px',
      height: '100vh',
      background: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '16px',
      paddingBottom: '16px',
      justifyContent: 'space-between',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100
    }}>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>

        {/* Logo */}
        <div style={{
          width: '36px', height: '36px',
          background: '#0d9488',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>AW</span>
        </div>

        {/* AI Materials */}
        <NavLink
          to="/materials"
          title="AI Materials"
          style={({ isActive }) => ({
            width: '40px', height: '40px',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isActive ? '#0d9488' : 'transparent',
            textDecoration: 'none',
            fontSize: '20px'
          })}
        >🗂</NavLink>

        {/* Chat With AI */}
        <NavLink
          to="/chat"
          title="Chat With AI"
          style={({ isActive }) => ({
            width: '40px', height: '40px',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isActive ? '#0d9488' : 'transparent',
            textDecoration: 'none',
            fontSize: '20px'
          })}
        >💬</NavLink>

      </div>

      {/* Logout */}
      <div style={{
        width: '40px', height: '40px',
        borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: '20px'
      }}>🚪</div>

    </div>
  )
}

export default Sidebar