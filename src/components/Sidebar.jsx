import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {/* Collapsed sidebar */}
      <div style={{
        width: '56px', height: '100vh', background: '#0f1117',
        display: 'flex', flexDirection: 'column',
        paddingTop: '16px', paddingBottom: '20px', justifyContent: 'space-between',
        position: 'fixed', left: 0, top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Hamburger */}
          <div onClick={() => setExpanded(true)} style={{ width: '56px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ width: '18px', height: '2px', background: '#0d9488', borderRadius: '2px' }} />
              <div style={{ width: '18px', height: '2px', background: '#0d9488', borderRadius: '2px' }} />
              <div style={{ width: '18px', height: '2px', background: '#0d9488', borderRadius: '2px' }} />
            </div>
          </div>

          {/* AI Materials */}
          <NavLink to="/materials" title="AI Materials"
            style={({ isActive }) => ({
              width: '56px', height: '56px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
              background: isActive ? '#0d9488' : 'transparent',
            })}
          >
            {({ isActive }) => (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'white' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                <polyline points="12 11 12 17"/>
                <polyline points="9 14 12 11 15 14"/>
              </svg>
            )}
          </NavLink>

          {/* Chat With AI */}
          <NavLink to="/chat" title="Chat With AI"
            style={({ isActive }) => ({
              width: '56px', height: '56px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
              background: isActive ? '#0d9488' : 'transparent',
            })}
          >
            {({ isActive }) => (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'white' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <circle cx="11" cy="11" r="2"/>
                <line x1="13" y1="13" x2="16" y2="16"/>
              </svg>
            )}
          </NavLink>

        </div>

        {/* Logout */}
        <div style={{ width: '56px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </div>
      </div>

      {/* Expanded panel overlay */}
      {expanded && (
        <>
          <div onClick={() => setExpanded(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 98
          }} />

          <div style={{
            position: 'fixed', left: '56px', top: 0,
            width: '220px', height: '100vh',
            background: '#0f1117', zIndex: 99,
            display: 'flex', flexDirection: 'column',
            paddingTop: '16px', paddingBottom: '20px',
          }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', marginBottom: '24px' }}>
              <span style={{ color: 'white', fontSize: '15px', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>AilWingBot</span>
              <div onClick={() => setExpanded(false)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ width: '18px', height: '2px', background: '#0d9488', borderRadius: '2px' }} />
                <div style={{ width: '18px', height: '2px', background: '#0d9488', borderRadius: '2px' }} />
                <div style={{ width: '18px', height: '2px', background: '#0d9488', borderRadius: '2px' }} />
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 8px' }}>

              <NavLink to="/materials" onClick={() => setExpanded(false)}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 12px', borderRadius: '8px',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                })}
              >
                {({ isActive }) => (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'white' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                      <polyline points="12 11 12 17"/>
                      <polyline points="9 14 12 11 15 14"/>
                    </svg>
                    <span style={{ color: isActive ? 'white' : '#94a3b8', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>AI Materials</span>
                  </>
                )}
              </NavLink>

              <NavLink to="/chat" onClick={() => setExpanded(false)}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 12px', borderRadius: '8px',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                })}
              >
                {({ isActive }) => (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'white' : '#94a3b8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      <circle cx="11" cy="11" r="2"/>
                      <line x1="13" y1="13" x2="16" y2="16"/>
                    </svg>
                    <span style={{ color: isActive ? 'white' : '#94a3b8', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Chat With AI</span>
                  </>
                )}
              </NavLink>

            </div>

            <div style={{ padding: '0 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span style={{ color: '#94a3b8', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Logout</span>
              </div>
            </div>

          </div>
        </>
      )}
    </>
  )
}

export default Sidebar