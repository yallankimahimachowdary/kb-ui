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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="15" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </div>

          {/* AI Materials - folder with cloud badge bottom-right */}
          <NavLink to="/materials" title="AI Materials"
            style={({ isActive }) => ({
              width: '56px', height: '56px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
              background: isActive ? '#0d9488' : 'transparent',
            })}
          >
            {({ isActive }) => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#ffffff' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Folder shape */}
                <path d="M2 7a2 2 0 0 1 2-2h4.17a2 2 0 0 1 1.42.59l1.41 1.41H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"/>
                {/* Cloud badge bottom-right */}
                <path d="M15.5 18.5a2 2 0 0 1-1.5-3.32A2 2 0 0 1 17 16a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1h-1.5z"/>
                <circle cx="18.5" cy="18" r="1" stroke="none" fill={isActive ? '#ffffff' : '#94a3b8'}/>
              </svg>
            )}
          </NavLink>

          {/* Chat - speech bubble with dots and magnifier bottom-right */}
          <NavLink to="/chat" title="Chat With AI"
            style={({ isActive }) => ({
              width: '56px', height: '56px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
              background: isActive ? '#0d9488' : 'transparent',
            })}
          >
            {({ isActive }) => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#ffffff' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Rounded speech bubble */}
                <path d="M4 4h11a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9l-5 3V7a3 3 0 0 1 0 0V4z"/>
                {/* Three dots inside bubble */}
                <circle cx="7" cy="10" r="0.8" fill={isActive ? '#ffffff' : '#94a3b8'} stroke="none"/>
                <circle cx="10" cy="10" r="0.8" fill={isActive ? '#ffffff' : '#94a3b8'} stroke="none"/>
                <circle cx="13" cy="10" r="0.8" fill={isActive ? '#ffffff' : '#94a3b8'} stroke="none"/>
                {/* Magnifier badge bottom-right */}
                <circle cx="17" cy="17" r="2.5"/>
                <line x1="19" y1="19" x2="21" y2="21"/>
              </svg>
            )}
          </NavLink>

        </div>

        {/* Logout */}
        <div style={{ width: '56px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <div onClick={() => setExpanded(false)} style={{ cursor: 'pointer' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="15" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#ffffff' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 7a2 2 0 0 1 2-2h4.17a2 2 0 0 1 1.42.59l1.41 1.41H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"/>
                      <path d="M15.5 18.5a2 2 0 0 1-1.5-3.32A2 2 0 0 1 17 16a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1h-1.5z"/>
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#ffffff' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h11a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9l-5 3V7a3 3 0 0 1 0 0V4z"/>
                      <circle cx="7" cy="10" r="0.8" fill={isActive ? '#ffffff' : '#94a3b8'} stroke="none"/>
                      <circle cx="10" cy="10" r="0.8" fill={isActive ? '#ffffff' : '#94a3b8'} stroke="none"/>
                      <circle cx="13" cy="10" r="0.8" fill={isActive ? '#ffffff' : '#94a3b8'} stroke="none"/>
                      <circle cx="17" cy="17" r="2.5"/>
                      <line x1="19" y1="19" x2="21" y2="21"/>
                    </svg>
                    <span style={{ color: isActive ? 'white' : '#94a3b8', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Chat With AI</span>
                  </>
                )}
              </NavLink>

            </div>

            <div style={{ padding: '0 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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