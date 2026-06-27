import { useState, useRef, useEffect } from 'react'
import { sendChatMessage } from '../api'

function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (input.trim() === '') return
    const userMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    try {
      const data = await sendChatMessage(input)
      setMessages(prev => [...prev, {
        role: 'bot',
        text: data.response || 'Sorry, I could not get a response.'
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'Something went wrong. Please try again.'
      }])
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  const restart = () => {
    setMessages([])
    setInput('')
    setLoading(false)
  }

  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <div style={{
        background: 'white', padding: '0 24px',
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid #e2e8f0',
        height: '52px', gap: '16px'
      }}>
        <span style={{ color: '#1e293b', fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>AilWingKB</span>

        <div style={{ width: '1px', height: '20px', background: '#e2e8f0' }} />

        <span style={{
          color: '#1e293b', fontSize: '14px', fontWeight: '500',
          borderBottom: '2px solid #0d9488',
          paddingBottom: '14px', marginBottom: '-1px',
          fontFamily: 'Inter, sans-serif'
        }}>Chat With AI</span>

        <div style={{ flex: 1 }} />

        {/* Bell icon - exact Figma paths */}
        <svg width="22" height="22" viewBox="1660 24 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1673 32.44V35.77M1673.02 28C1669.34 28 1666.36 30.98 1666.36 34.66V36.76C1666.36 37.44 1666.08 38.46 1665.73 39.04L1664.46 41.16C1663.68 42.47 1664.22 43.93 1665.66 44.41C1670.44 46 1675.61 46 1680.39 44.41C1680.71 44.3048 1680.99 44.13 1681.23 43.8986C1681.47 43.6671 1681.65 43.385 1681.77 43.073C1681.89 42.761 1681.93 42.4271 1681.9 42.096C1681.87 41.7649 1681.76 41.445 1681.59 41.16L1680.32 39.04C1679.97 38.46 1679.69 37.43 1679.69 36.76V34.66C1679.68 31 1676.68 28 1673.02 28Z" stroke="#64748b" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
          <path d="M1676.33 44.8199C1676.33 46.6499 1674.83 48.1499 1673 48.1499C1672.09 48.1499 1671.25 47.7699 1670.65 47.1699C1670.05 46.5699 1669.67 45.7299 1669.67 44.8199" stroke="#64748b" strokeWidth="1.5" strokeMiterlimit="10"/>
        </svg>

        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#94a3b8"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{
        padding: '10px 24px', fontSize: '12px', color: '#94a3b8',
        fontFamily: 'Inter, sans-serif', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        background: 'white', borderBottom: '1px solid #f1f5f9'
      }}>
        <span>
          <span style={{ color: '#94a3b8', fontWeight: 400 }}>Home</span>
          <span style={{ margin: '0 4px' }}>›</span>
          <span style={{ color: '#1e293b', fontWeight: 700 }}>Chat With AI</span>
        </span>
        {messages.length > 0 && (
          <button onClick={restart} style={{
            background: 'none', border: 'none',
            color: '#ef4444', cursor: 'pointer',
            fontSize: '13px', fontWeight: '500',
            fontFamily: 'Inter, sans-serif'
          }}>Restart</button>
        )}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '32px 80px',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>

          {/* Welcome state - exact Figma avatar SVG */}
          {messages.length === 0 && !loading && (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', paddingTop: '120px', gap: '12px'
            }}>
              {/* Figma bot avatar - 3D sphere with highlight */}
              <div style={{
                width: '76px', height: '76px', borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, #a8f0d8 0%, #2dd4a0 20%, #0d9e72 50%, #065c42 80%, #032e21 100%)`,
                boxShadow: '0 4px 16px rgba(13, 158, 114, 0.35)',
                flexShrink: 0
              }} />

              <h2 style={{
                color: '#1e293b', fontSize: '22px', fontWeight: '600',
                margin: 0, fontFamily: 'Inter, sans-serif'
              }}>
                Welcome to AwBot
              </h2>
              <p style={{ color: '#0f172a', fontSize: '14px', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                Start by scripting a task, and let the chat take over.
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              {msg.role === 'user' ? (
                <div style={{
                  maxWidth: '55%', padding: '10px 16px',
                  borderRadius: '12px',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  color: '#1e293b', fontSize: '14px',
                  lineHeight: '1.5', fontFamily: 'Inter, sans-serif'
                }}>
                  {msg.text}
                </div>
              ) : (
                <div style={{
                  maxWidth: '65%',
                  color: '#1e293b', fontSize: '14px',
                  lineHeight: '1.5', fontFamily: 'Inter, sans-serif',
                  padding: '4px 0'
                }}>
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ color: '#94a3b8', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
              Thinking...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: '16px 80px 32px' }}>
          <div style={{
            background: 'white', border: '1px solid #e2e8f0',
            borderRadius: '16px', padding: '16px 16px 12px',
            display: 'flex', flexDirection: 'column', gap: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <input
              type="text"
              placeholder="Write your message ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                border: 'none', outline: 'none',
                background: 'transparent',
                color: '#1e293b', fontSize: '14px',
                fontFamily: 'Inter, sans-serif', width: '100%'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={sendMessage}
                disabled={input.trim() === '' || loading}
                style={{
                  width: '36px', height: '36px',
                  borderRadius: '10px', border: 'none',
                  background: input.trim() === '' || loading ? '#e2e8f0' : '#0d9488',
                  color: 'white',
                  cursor: input.trim() === '' || loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
