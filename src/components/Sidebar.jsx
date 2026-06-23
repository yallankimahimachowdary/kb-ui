import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div style={{
      width: '56px', height: '100vh', background: '#1e2433',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: '16px', paddingBottom: '20px', justifyContent: 'space-between',
      position: 'fixed', left: 0, top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>

        {/* Hamburger */}
        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ width: '18px', height: '2px', background: '#94a3b8', borderRadius: '2px' }} />
            <div style={{ width: '18px', height: '2px', background: '#94a3b8', borderRadius: '2px' }} />
            <div style={{ width: '18px', height: '2px', background: '#94a3b8', borderRadius: '2px' }} />
          </div>
        </div>

        {/* AI Materials */}
        <NavLink to="/materials" title="AI Materials"
          style={({ isActive }) => ({
            width: '40px', height: '40px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isActive ? '#0d9488' : 'transparent', textDecoration: 'none',
          })}
        >
          {({ isActive }) => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#fff' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          )}
        </NavLink>

        {/* Chat With AI */}
        <NavLink to="/chat" title="Chat With AI"
          style={({ isActive }) => ({
            width: '40px', height: '40px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isActive ? '#0d9488' : 'transparent', textDecoration: 'none',
          })}
        >
          {({ isActive }) => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#fff' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          )}
        </NavLink>

      </div>

      {/* Logout */}
      <div style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </div>
    </div>
  )
}

export default Sidebar