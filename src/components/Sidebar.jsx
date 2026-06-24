import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div style={{
      width: '56px', height: '100vh', background: '#0f1117',
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
            width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', background: 'transparent',
            borderLeft: isActive ? '3px solid #0d9488' : '3px solid transparent',
            marginLeft: '-3px',
          })}
        >
          {({ isActive }) => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#0d9488' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="8" y1="13" x2="16" y2="13"/>
              <line x1="8" y1="17" x2="13" y2="17"/>
            </svg>
          )}
        </NavLink>

        {/* Chat With AI */}
        <NavLink to="/chat" title="Chat With AI"
          style={({ isActive }) => ({
            width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', background: 'transparent',
            borderLeft: isActive ? '3px solid #0d9488' : '3px solid transparent',
            marginLeft: '-3px',
          })}
        >
          {({ isActive }) => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#0d9488' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          )}
        </NavLink>

      </div>

      {/* Logout */}
      <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
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