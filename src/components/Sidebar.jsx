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
            <svg
              width="24"
              height="17"
              viewBox="0 0 32 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
            <rect width="17" height="2" rx="1" fill="#036A55" />
            <rect y="10" width="32" height="2" rx="1" fill="#0AA182" />
            <rect y="20" width="25" height="2" rx="1" fill="#D9D9D9" />
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
              <path
                d="M10.125 24.75H7.875C3.375 24.75 2.25 23.625 2.25 19.125V7.875C2.25 3.375 3.375 2.25 7.875 2.25H9.5625C11.25 2.25 11.6213 2.74501 12.2625 3.60001L13.95 5.85001C14.3775 6.41251 14.625 6.75 15.75 6.75H19.125C23.625 6.75 24.75 7.875 24.75 12.375V14.625"
                stroke={isActive ? "#ffffff" : "#94a3b8"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
              <path
                d="M15.48 20.6101C12.8363 20.8013 12.8363 24.6263 15.48 24.8176H21.735C22.4888 24.8176 23.2313 24.5363 23.7825 24.03C25.6388 22.41 24.6487 19.17 22.2075 18.8663C21.33 13.59 13.7025 15.5925 15.5025 20.6213"
                stroke={isActive ? "#ffffff" : "#94a3b8"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
              <svg
                width="24"
                height="24"
                viewBox="30 17 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
              <path
                d="M41.2 37.37C40.54 38.25 39.46 38.25 38.8 37.37L37.3 35.37C37.13 35.15 36.77 34.97 36.5 34.97H36C32 34.97 30 33.97 30 28.97V23.97C30 19.97 32 17.97 36 17.97H44C48 17.97 50 19.97 50 23.97V28.97"
                stroke={isActive ? "#fff" : "#94a3b8"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M46.2 37.4C47.9673 37.4 49.4 35.9673 49.4 34.2C49.4 32.4327 47.9673 31 46.2 31C44.4327 31 43 32.4327 43 34.2C43 35.9673 44.4327 37.4 46.2 37.4Z"
                stroke={isActive ? "#fff" : "#94a3b8"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M50 38L49 37"
                stroke={isActive ? "#fff" : "#94a3b8"}
                strokeWidth="1.5"
                strokeLinecap="round"
              />

  <circle cx="36" cy="27" r="1" fill={isActive ? "#fff" : "#94a3b8"} />
  <circle cx="40" cy="27" r="1" fill={isActive ? "#fff" : "#94a3b8"} />
  <circle cx="44" cy="27" r="1" fill={isActive ? "#fff" : "#94a3b8"} />
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="30 17 20 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                      d="M41.2 37.37C40.54 38.25 39.46 38.25 38.8 37.37L37.3 35.37C37.13 35.15 36.77 34.97 36.5 34.97H36C32 34.97 30 33.97 30 28.97V23.97C30 19.97 32 17.97 36 17.97H44C48 17.97 50 19.97 50 23.97V28.97"
                      stroke={isActive ? "#fff" : "#94a3b8"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M46.2 37.4C47.9673 37.4 49.4 35.9673 49.4 34.2C49.4 32.4327 47.9673 31 46.2 31C44.4327 31 43 32.4327 43 34.2C43 35.9673 44.4327 37.4 46.2 37.4Z"
                      stroke={isActive ? "#fff" : "#94a3b8"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M50 38L49 37"
                      stroke={isActive ? "#fff" : "#94a3b8"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    <circle cx="36" cy="27" r="1" fill={isActive ? "#fff" : "#94a3b8"} />
                    <circle cx="40" cy="27" r="1" fill={isActive ? "#fff" : "#94a3b8"} />
                    <circle cx="44" cy="27" r="1" fill={isActive ? "#fff" : "#94a3b8"} />
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