import { useState, useEffect, useRef } from 'react'
import { getMaterials, uploadMaterial, finalizeMaterial, updateMaterialStatus, deleteMaterial } from '../api'

const SuspendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

const ActivateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/>
  </svg>
)

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
)

function Modal({ type, onCancel, onConfirm }) {
  const config = {
    suspend: {
      title: 'Suspend Material',
      body: 'Selected material will be suspended and will not be used by AI.',
      confirmText: 'Suspend',
      confirmBg: '#f59e0b',
      iconBg: '#fef3c7',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      )
    },
    reactivate: {
      title: 'Reactivate Material',
      body: 'Selected material will be activated and available for AI use.',
      confirmText: 'Confirm',
      confirmBg: '#0d9488',
      iconBg: '#d1fae5',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
          <polyline points="13 2 13 9 20 9"/>
        </svg>
      )
    },
    delete: {
      title: 'Delete Material',
      body: 'Selected material will be deleted permanently.',
      confirmText: 'Delete',
      confirmBg: '#ef4444',
      iconBg: '#fee2e2',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
        </svg>
      )
    }
  }

  const c = config[type]
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px 28px', width: '340px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{c.icon}</div>
        <h3 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '16px', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>{c.title}</h3>
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '28px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>{c.body}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={onCancel} style={{ padding: '9px 28px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '9px 28px', borderRadius: '8px', border: 'none', background: c.confirmBg, color: 'white', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>{c.confirmText}</button>
        </div>
      </div>
    </div>
  )
}

function UploadWizard({ onClose, onSuccess }) {
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState([])
  const [annotation, setAnnotation] = useState('')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [trackingToken, setTrackingToken] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef()

  const handleFiles = (selected) => {
    const pdfs = Array.from(selected).filter(f => f.type === 'application/pdf' && f.size <= 25 * 1024 * 1024)
    setFiles(prev => [...prev, ...pdfs])
  }

  const removeFile = (index) => setFiles(files.filter((_, i) => i !== index))

  const handleUpload = async () => {
    if (files.length === 0) return
    setUploading(true)
    try {
      const data = await uploadMaterial(files[0])
      if (data.tracking_token) {
        setTrackingToken(data.tracking_token)
        setStep(2)
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'))
      }
    } catch (err) {
      alert('Upload failed. Please try again.')
    }
    setUploading(false)
  }

  const startIndexing = async () => {
    if (!trackingToken) return
    setStep(3)
    setProgress(0)
    try {
      let p = 0
      const interval = setInterval(() => {
        p += 5
        setProgress(p)
        if (p >= 90) clearInterval(interval)
      }, 150)

      const data = await finalizeMaterial(trackingToken, annotation)
      clearInterval(interval)
      setProgress(100)

      if (data.tracking_token || data.message) {
        setResult('success')
      } else {
        setResult('error')
      }
    } catch (err) {
      setResult('error')
    }
  }

  const StepDot = ({ s }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: step >= s ? '#0d9488' : '#e2e8f0' }} />
      <span style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', color: step >= s ? '#0d9488' : '#94a3b8', fontWeight: step >= s ? '500' : '400' }}>
        {s === 1 ? 'Upload Material' : s === 2 ? 'Annotation' : 'Indexing'}
      </span>
    </div>
  )

  const StepLine = ({ s }) => (
    <div style={{ width: '60px', height: '1px', background: step > s ? '#0d9488' : '#e2e8f0' }} />
  )

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'white', zIndex: 500, display: 'flex', flexDirection: 'column', marginLeft: '56px' }}>

      {showCancelModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px 28px', width: '340px', textAlign: 'center' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h3 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '16px', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>Cancel Creation</h3>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '28px', fontFamily: 'Inter, sans-serif' }}>Are you sure you want to cancel the current process?</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setShowCancelModal(false)} style={{ padding: '9px 28px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>No</button>
              <button onClick={onClose} style={{ padding: '9px 28px', borderRadius: '8px', border: 'none', background: '#f59e0b', color: 'white', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px 28px', width: '340px', textAlign: 'center' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: result === 'success' ? '#d1fae5' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              {result === 'success' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              )}
            </div>
            <h3 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '16px', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>{result === 'success' ? 'Indexing Success' : 'Indexing Failed'}</h3>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '28px', fontFamily: 'Inter, sans-serif' }}>{result === 'success' ? 'Your material has been indexed successfully.' : 'Your material could not be indexed.'}</p>
            <button onClick={() => result === 'success' ? onSuccess() : onClose()} style={{ padding: '9px 40px', borderRadius: '8px', border: 'none', background: result === 'success' ? '#0d9488' : '#ef4444', color: 'white', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>OK</button>
          </div>
        </div>
      )}

      {/* Wizard Navbar */}
      {/* Navbar */}
      <div style={{ background: 'white', padding: '0 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #e2e8f0', height: '52px', gap: '16px' }}>
      <span style={{ color: '#1e293b', fontSize: '14px', fontFamily: 'Inter, sans-serif',fontWeight: '600' }}>AilWingKB</span><div style={{ width: '1px', height: '20px', background: '#e2e8f0' }} />
      <div style={{ width: '1px', height: '20px', background: '#e2e8f0' }} />
      <span style={{ color: '#1e293b', fontSize: '14px', fontWeight: '500', borderBottom: '2px solid #0d9488', paddingBottom: '14px', marginBottom: '-1px', fontFamily: 'Inter, sans-serif' }}>AI Materials</span>
        <div style={{ flex: 1 }} />
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#94a3b8"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
        </div>
      </div>

      <div style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', borderBottom: '1px solid #f1f5f9' }}>
        <button onClick={() => setShowCancelModal(true)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Cancel</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StepDot s={1} /><StepLine s={1} /><StepDot s={2} /><StepLine s={2} /><StepDot s={3} />
        </div>
        {step === 1 && (
          <button onClick={handleUpload} disabled={files.length === 0 || uploading} style={{ background: files.length === 0 || uploading ? '#e2e8f0' : '#0d9488', color: files.length === 0 || uploading ? '#94a3b8' : 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: files.length === 0 || uploading ? 'not-allowed' : 'pointer', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>
            {uploading ? 'Uploading...' : 'Proceed Next'}
          </button>
        )}
        {step === 2 && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setStep(1)} style={{ background: 'white', color: '#64748b', border: '1px solid #e2e8f0', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>Previous</button>
            <button onClick={startIndexing} disabled={annotation.trim().length === 0} style={{ background: annotation.trim().length === 0 ? '#e2e8f0' : '#0d9488', color: annotation.trim().length === 0 ? '#94a3b8' : 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: annotation.trim().length === 0 ? 'not-allowed' : 'pointer', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Index Material</button>
          </div>
        )}
        {step === 3 && <div style={{ width: '100px' }} />}
      </div>

      <div style={{ flex: 1, padding: '32px 40px', background: '#f8fafc', overflowY: 'auto' }}>
        {step === 1 && (
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div onDragOver={(e) => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }} onClick={() => fileInputRef.current.click()} style={{ border: `1.5px dashed ${dragOver ? '#0d9488' : '#cbd5e1'}`, borderRadius: '12px', padding: '48px 24px', textAlign: 'center', cursor: 'pointer', background: dragOver ? '#f0fdf4' : 'white' }}>
              <div style={{ marginBottom: '12px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p style={{ color: '#64748b', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>Drag & drop file or <span style={{ color: '#0d9488', textDecoration: 'underline' }}>Browse</span></p>
              <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px', fontFamily: 'Inter, sans-serif' }}>Max file size is 25MB. Supported file type: pdf</p>
              <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={(e) => handleFiles(e.target.files)} />
            </div>
            {files.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Uploaded Material</p>
                {files.map((f, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderRadius: '8px', padding: '10px 14px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ background: '#fee2e2', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      </div>
                      <span style={{ color: '#1e293b', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>{f.name}</span>
                      <span style={{ color: '#94a3b8', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>{(f.size / 1024).toFixed(0)}kb</span>
                    </div>
                    <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <textarea value={annotation} onChange={(e) => setAnnotation(e.target.value.slice(0, 2000))} placeholder="Annotation" style={{ width: '100%', height: '320px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b', padding: '14px', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }} />
            <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px', textAlign: 'right', fontFamily: 'Inter, sans-serif' }}>{annotation.length}/2000</p>
          </div>
        )}

        {step === 3 && (
          <div style={{ maxWidth: '560px', margin: '40px auto' }}>
            <div style={{ background: '#e2e8f0', borderRadius: '999px', height: '8px', overflow: 'hidden', marginBottom: '10px' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: '#0d9488', borderRadius: '999px', transition: 'width 0.1s' }} />
            </div>
            <p style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>Indexing Material : {progress}%</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Materials() {
  const [materials, setMaterials] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize] = useState(12)
  const [loading, setLoading] = useState(true)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [modal, setModal] = useState(null)
  const [showWizard, setShowWizard] = useState(false)

  const fetchMaterials = async () => {
    setLoading(true)
    try {
      const data = await getMaterials(page, pageSize, search)
      setMaterials(data.materials || [])
      setTotalPages(data.pages || 1)
      setTotal(data.total || 0)
    } catch (err) {
      console.error('Failed to fetch materials:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMaterials()
  }, [page, search])

  const confirmAction = async () => {
    try {
      if (modal.type === 'suspend') {
        await updateMaterialStatus(modal.item.id, 'inactive')
      } else if (modal.type === 'reactivate') {
        await updateMaterialStatus(modal.item.id, 'active')
      } else if (modal.type === 'delete') {
        await deleteMaterial(modal.item.id)
      }
      setModal(null)
      fetchMaterials()
    } catch (err) {
      console.error('Action failed:', err)
      setModal(null)
    }
  }

  return (
    <>
      {showWizard && (
        <UploadWizard
          onClose={() => setShowWizard(false)}
          onSuccess={() => {
            setShowWizard(false)
            fetchMaterials()
          }}
        />
      )}

      <div style={{ background: '#f8fafc', minHeight: '100vh' }} onClick={() => setOpenMenuId(null)}>

        {modal && <Modal type={modal.type} onCancel={() => setModal(null)} onConfirm={confirmAction} />}

        {/* Navbar */}
        <div style={{ background: 'white', padding: '0 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #e2e8f0', height: '52px', gap: '24px' }}>
          <span style={{ color: '#1e293b', fontSize: '14px', fontFamily: 'Inter, sans-serif',fontWeight: '600' }}>AilWingKB</span><div style={{ width: '1px', height: '20px', background: '#e2e8f0' }} />
          <span style={{ color: '#1e293b', fontSize: '14px', fontWeight: '500', borderBottom: '2px solid #0d9488', paddingBottom: '14px', marginBottom: '-1px', fontFamily: 'Inter, sans-serif' }}>AI Materials</span>
          <div style={{ flex: 1 }} />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#94a3b8"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </div>
        </div>

        {/* Breadcrumb + Upload */}
        <div style={{ padding: '10px 24px', fontSize: '12px', color: '#94a3b8', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', background: 'white' }}>
          <span>Home <span style={{ margin: '0 4px' }}>›</span><span style={{ color: '#1e293b', fontWeight: '500' }}>AI Materials</span></span>
          <button onClick={() => setShowWizard(true)} style={{ background: '#0d9488', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
            + Upload
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 24px 24px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ color: '#1e293b', fontSize: '16px', fontWeight: '600', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
              </svg>
              AI Materials
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '7px 12px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input type="text" placeholder="Search" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#1e293b', background: 'transparent', width: '180px', fontFamily: 'Inter, sans-serif' }} />
              </div>
              <button style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="18" x2="12" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={thStyle}>Material Name</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Size</th>
                  <th style={thStyle}>Uploaded On</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>Loading...</td></tr>
                ) : materials.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>No materials found.</td></tr>
                ) : (
                  materials.map((item) => (
                    <tr key={item.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}>{item.file_name}</td>
                      <td style={tdStyle}>PDF</td>
                      <td style={tdStyle}>{item.file_size_bytes ? (item.file_size_bytes / 1024).toFixed(0) + 'KB' : '-'}</td>
                      <td style={tdStyle}>{item.created_at ? new Date(item.created_at).toLocaleString() : '-'}</td>
                      <td style={tdStyle}>
                        <span style={{
                          background: item.status === 'active' ? '#d1fae5' : '#fef3c7',
                          color: item.status === 'active' ? '#0d9488' : '#d97706',
                          padding: '4px 12px', borderRadius: '20px',
                          fontSize: '12px', fontWeight: '500', fontFamily: 'Inter, sans-serif'
                        }}>
                          {item.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === item.id ? null : item.id) }} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '14px', letterSpacing: '2px', padding: '4px 10px', borderRadius: '6px' }}>···</button>
                          {openMenuId === item.id && (
                            <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', right: 0, top: '32px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', zIndex: 100, minWidth: '180px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                              {item.status === 'active' ? (
                                <button onClick={() => { setModal({ type: 'suspend', item }); setOpenMenuId(null) }} style={menuItemStyle}>
                                  <SuspendIcon /><span style={{ color: '#f59e0b' }}>Suspend Material</span>
                                </button>
                              ) : (
                                <button onClick={() => { setModal({ type: 'reactivate', item }); setOpenMenuId(null) }} style={menuItemStyle}>
                                  <ActivateIcon /><span style={{ color: '#0d9488' }}>Activate Material</span>
                                </button>
                              )}
                              <div style={{ height: '1px', background: '#f1f5f9' }} />
                              <button onClick={() => { setModal({ type: 'delete', item }); setOpenMenuId(null) }} style={menuItemStyle}>
                                <DeleteIcon /><span style={{ color: '#ef4444' }}>Delete Material</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '12px', color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            <span>Showing {materials.length} of {total} items</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={pageBtn(page === 1)}>‹</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: page === i + 1 ? '#0d9488' : 'white', color: page === i + 1 ? 'white' : '#64748b', cursor: 'pointer', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>{i + 1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={pageBtn(page === totalPages)}>›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const thStyle = {
  padding: '11px 16px', textAlign: 'left',
  color: '#94a3b8', fontWeight: '400', fontSize: '12px',
  fontFamily: 'Inter, sans-serif', background: '#f0fdf9'
}
const tdStyle = {
  padding: '13px 16px', color: '#1e293b', fontSize: '13px',
  fontFamily: 'Inter, sans-serif'
}
const menuItemStyle = {
  display: 'flex', alignItems: 'center', gap: '10px',
  width: '100%', padding: '10px 14px',
  background: 'none', border: 'none',
  fontSize: '13px', textAlign: 'left', cursor: 'pointer',
  fontFamily: 'Inter, sans-serif'
}
const pageBtn = (disabled) => ({
  width: '28px', height: '28px', borderRadius: '6px',
  border: '1px solid #e2e8f0', background: 'white',
  color: disabled ? '#cbd5e1' : '#64748b',
  cursor: disabled ? 'not-allowed' : 'pointer', fontSize: '14px',
  fontFamily: 'Inter, sans-serif'
})

export default Materials