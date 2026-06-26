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
        height: '52px', gap: '24px'
      }}>
        <span style={{ color: '#1e293b', fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>AilWingKB</span>
        <span style={{
          color: '#0d9488', fontSize: '14px', fontWeight: '400',
          borderBottom: '2px solid #0d9488',
          paddingBottom: '14px', marginBottom: '-1px',
          fontFamily: 'Inter, sans-serif'
        }}>Chat With AI</span>
        <div style={{ flex: 1 }} />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#94a3b8"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
        </div>
      </div>

      {/* Breadcrumb + Restart */}
      <div style={{
        padding: '10px 24px', fontSize: '12px', color: '#94a3b8',
        fontFamily: 'Inter, sans-serif', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        background: 'white', borderBottom: '1px solid #f1f5f9'
      }}>
        <span>
          Home <span style={{ margin: '0 4px' }}>›</span>
          <span style={{ color: '#1e293b', fontWeight: '500' }}>Chat With AI</span>
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

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '32px 80px',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>

          {/* Welcome state */}
          {messages.length === 0 && !loading && (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', paddingTop: '120px'
            }}>
              <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #4ade80 0%, #16a34a 40%, #064e3b 100%)',
              marginBottom: '16px', flexShrink: 0
              }} />
              <h2 style={{
                color: '#1e293b', fontSize: '22px', fontWeight: '600',
                marginBottom: '8px', fontFamily: 'Inter, sans-serif'
              }}>
                Welcome to AwBot
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
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

          {/* Loading */}
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