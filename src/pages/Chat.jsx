import { useState } from 'react'
import { sendChatQuery } from '../api'

function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (input.trim() === '') return
    const userMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const data = await sendChatQuery(input)
      setMessages(prev => [...prev, {
        role: 'bot',
        text: data.response
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'Sorry, I could not connect to the AI. Please make sure the backend is running.'
      }])
    } finally {
      setLoading(false)
    }
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
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Top navbar */}
      <div style={{
        background: 'white', padding: '0 24px',
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid #e2e8f0',
        height: '56px', gap: '24px'
      }}>
        <span style={{ color: '#64748b', fontSize: '14px' }}>AilWingKB</span>
        <span style={{
          color: '#0d9488', fontSize: '14px', fontWeight: '600',
          borderBottom: '2px solid #0d9488',
          paddingBottom: '16px', marginBottom: '-1px'
        }}>Chat With AI</span>
        <div style={{ flex: 1 }} />
        {messages.length > 0 && (
          <button
            onClick={restart}
            style={{
              background: 'none', border: 'none',
              color: '#ef4444', cursor: 'pointer',
              fontSize: '14px', fontWeight: '500'
            }}
          >Restart</button>
        )}
      </div>

      {/* Breadcrumb */}
      <div style={{ padding: '12px 24px', fontSize: '13px', color: '#94a3b8' }}>
        Home &gt; <span style={{ color: '#1e293b' }}>Chat With AI</span>
      </div>

      {/* Chat area */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        margin: '0 24px 24px',
        background: 'white', borderRadius: '12px',
        border: '1px solid #e2e8f0', overflow: 'hidden'
      }}>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '24px', display: 'flex',
          flexDirection: 'column', gap: '16px',
          minHeight: '400px'
        }}>

          {/* Welcome state */}
          {messages.length === 0 && !loading && (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', paddingTop: '80px'
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #0d9488, #34d399)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '16px'
              }}>🤖</div>
              <h2 style={{ color: '#1e293b', fontSize: '20px', marginBottom: '8px' }}>
                Welcome to AwBot
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                Start by scripting a task, and let the chat take over.
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start', gap: '10px'
            }}>
              {msg.role === 'bot' && (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0d9488, #34d399)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', flexShrink: 0
                }}>🤖</div>
              )}
              <div style={{
                maxWidth: '60%', padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                background: '#f1f5f9',
                color: '#1e293b', fontSize: '14px', lineHeight: '1.5'
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #0d9488, #34d399)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px'
              }}>🤖</div>
              <div style={{
                background: '#f1f5f9', padding: '10px 14px',
                borderRadius: '12px 12px 12px 4px',
                color: '#94a3b8', fontSize: '14px'
              }}>Thinking...</div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', gap: '12px',
          background: 'white'
        }}>
          <input
            type="text"
            placeholder="Write your message ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1, padding: '12px 16px',
              borderRadius: '8px', border: '1px solid #e2e8f0',
              background: '#f8fafc', color: '#1e293b',
              fontSize: '14px', outline: 'none'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={input.trim() === '' || loading}
            style={{
              width: '40px', height: '40px',
              borderRadius: '8px', border: 'none',
              background: input.trim() === '' ? '#e2e8f0' : '#0d9488',
              color: 'white', cursor: input.trim() === '' ? 'not-allowed' : 'pointer',
              fontSize: '18px', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}
          >↑</button>
        </div>
      </div>
    </div>
  )
}

export default Chat