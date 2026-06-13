import { useState, useRef } from 'react'

const fakeData = [
  { id: 1, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 2, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 3, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Inactive', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 4, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 5, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 6, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 7, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 8, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Inactive', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 9, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 10, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 11, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
  { id: 12, file_name: 'User manual.pdf', type: 'PDF', size: '40KB', status: 'Active', uploaded_at: '12/12/2024 | 12:00 PM' },
]

const PAGE_SIZE = 12

// ─── UPLOAD WIZARD ────────────────────────────────────────────
function UploadWizard({ onClose, onSuccess }) {
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState([])
  const [annotation, setAnnotation] = useState('')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const fileInputRef = useRef()

  const handleFiles = (selected) => {
    const pdfs = Array.from(selected).filter(
      f => f.type === 'application/pdf' && f.size <= 25 * 1024 * 1024
    )
    setFiles(prev => [...prev, ...pdfs])
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const startIndexing = () => {
    setStep(3)
    setProgress(0)
    let p = 0
    const interval = setInterval(() => {
      p += 10
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setResult('success')
      }
    }, 300)
  }

  const stepDot = (s) => ({
    width: '10px', height: '10px', borderRadius: '50%',
    background: step >= s ? '#0d9488' : '#e2e8f0',
    display: 'inline-block'
  })

  const stepLine = (s) => ({
    height: '2px', width: '60px',
    background: step > s ? '#0d9488' : '#e2e8f0',
    display: 'inline-block', verticalAlign: 'middle'
  })

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'white', zIndex: 500,
      display: 'flex', flexDirection: 'column'
    }}>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: 'white', borderRadius: '12px',
            padding: '32px', width: '360px', textAlign: 'center'
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: '#fef3c7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '22px'
            }}>⚠️</div>
            <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>Cancel Creation</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
              Are you sure you want to cancel the current process?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setShowCancelModal(false)} style={{
                padding: '8px 24px', borderRadius: '8px',
                border: '1px solid #e2e8f0', background: 'white',
                color: '#64748b', cursor: 'pointer', fontSize: '14px'
              }}>No</button>
              <button onClick={onClose} style={{
                padding: '8px 24px', borderRadius: '8px', border: 'none',
                background: '#f59e0b', color: 'white',
                cursor: 'pointer', fontSize: '14px'
              }}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {result && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: 'white', borderRadius: '12px',
            padding: '32px', width: '360px', textAlign: 'center'
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: result === 'success' ? '#d1fae5' : '#fee2e2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '22px'
            }}>
              {result === 'success' ? '✅' : '❌'}
            </div>
            <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>
              {result === 'success' ? 'Indexing Success' : 'Indexing Failed'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
              {result === 'success'
                ? 'You material has been indexed successfully.'
                : 'You material is not indexed yet.'}
            </p>
            <button
              onClick={() => result === 'success' ? onSuccess(files, annotation) : onClose()}
              style={{
                padding: '8px 32px', borderRadius: '8px', border: 'none',
                background: result === 'success' ? '#0d9488' : '#ef4444',
                color: 'white', cursor: 'pointer', fontSize: '14px'
              }}
            >OK</button>
          </div>
        </div>
      )}

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
        }}>AI Materials</span>
      </div>

      {/* Step bar */}
      <div style={{
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <button
          onClick={() => setShowCancelModal(true)}
          style={{
            background: 'none', border: 'none',
            color: '#ef4444', cursor: 'pointer', fontSize: '14px'
          }}
        >Cancel</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={stepDot(1)} />
            <span style={{ fontSize: '13px', color: step >= 1 ? '#0d9488' : '#94a3b8' }}>Upload Material</span>
          </div>
          <span style={stepLine(1)} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={stepDot(2)} />
            <span style={{ fontSize: '13px', color: step >= 2 ? '#0d9488' : '#94a3b8' }}>Annotation</span>
          </div>
          <span style={stepLine(2)} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={stepDot(3)} />
            <span style={{ fontSize: '13px', color: step >= 3 ? '#0d9488' : '#94a3b8' }}>Indexing</span>
          </div>
        </div>

        {step === 1 && (
          <button
            onClick={() => setStep(2)}
            disabled={files.length === 0}
            style={{
              background: files.length === 0 ? '#e2e8f0' : '#0d9488',
              color: files.length === 0 ? '#94a3b8' : 'white',
              border: 'none', padding: '8px 20px',
              borderRadius: '8px', cursor: files.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >Proceed Next</button>
        )}
        {step === 2 && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setStep(1)}
              style={{
                background: 'white', color: '#64748b',
                border: '1px solid #e2e8f0', padding: '8px 20px',
                borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
              }}
            >Previous</button>
            <button
              onClick={startIndexing}
              disabled={annotation.trim().length === 0}
              style={{
                background: annotation.trim().length === 0 ? '#e2e8f0' : '#0d9488',
                color: annotation.trim().length === 0 ? '#94a3b8' : 'white',
                border: 'none', padding: '8px 20px',
                borderRadius: '8px',
                cursor: annotation.trim().length === 0 ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >Index Material</button>
          </div>
        )}
        {step === 3 && <div style={{ width: '100px' }} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '40px', background: '#f8fafc', overflowY: 'auto' }}>

        {/* STEP 1 */}
        {step === 1 && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
              onClick={() => fileInputRef.current.click()}
              style={{
                border: `2px dashed ${dragOver ? '#0d9488' : '#cbd5e1'}`,
                borderRadius: '12px', padding: '60px',
                textAlign: 'center', cursor: 'pointer',
                background: dragOver ? '#f0fdf4' : 'white'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px', color: '#0d9488' }}>↑</div>
              <p style={{ color: '#64748b', fontSize: '14px' }}>
                Drag & drop file or <span style={{ color: '#0d9488', textDecoration: 'underline' }}>Browse</span>
              </p>
              <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>
                Max file size is 500MB. Supported file type: pdf
              </p>
              <input
                ref={fileInputRef}
                type="file" accept=".pdf" multiple
                style={{ display: 'none' }}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {files.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>Uploaded Material</p>
                {files.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'white', borderRadius: '8px',
                    padding: '10px 16px', marginBottom: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        background: '#fee2e2', color: '#ef4444',
                        padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold'
                      }}>PDF</span>
                      <span style={{ color: '#1e293b', fontSize: '14px' }}>{f.name}</span>
                      <span style={{ color: '#94a3b8', fontSize: '12px' }}>{(f.size / 1024).toFixed(0)}kb</span>
                    </div>
                    <button onClick={() => removeFile(i)} style={{
                      background: 'none', border: 'none',
                      color: '#94a3b8', cursor: 'pointer', fontSize: '16px'
                    }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <textarea
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value.slice(0, 2000))}
              placeholder="Annotation"
              style={{
                width: '100%', height: '300px',
                background: 'white', border: '1px solid #e2e8f0',
                borderRadius: '8px', color: '#1e293b',
                padding: '16px', fontSize: '14px',
                resize: 'vertical', boxSizing: 'border-box',
                outline: 'none'
              }}
            />
            <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '8px', textAlign: 'right' }}>
              {annotation.length}/2000
            </p>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center' }}>
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '14px' }}>
              Indexing Material - {progress}%
            </p>
            <div style={{
              background: '#e2e8f0', borderRadius: '999px',
              height: '8px', overflow: 'hidden'
            }}>
              <div style={{
                height: '100%', width: `${progress}%`,
                background: '#0d9488', borderRadius: '999px',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────
function Materials() {
  const [materials, setMaterials] = useState(fakeData)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [modal, setModal] = useState(null)
  const [showWizard, setShowWizard] = useState(false)

  const filtered = materials.filter(item =>
    item.file_name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const confirmAction = () => {
    if (modal.type === 'suspend') {
      setMaterials(materials.map(m => m.id === modal.item.id ? { ...m, status: 'Inactive' } : m))
    } else if (modal.type === 'reactivate') {
      setMaterials(materials.map(m => m.id === modal.item.id ? { ...m, status: 'Active' } : m))
    } else if (modal.type === 'delete') {
      setMaterials(materials.filter(m => m.id !== modal.item.id))
    }
    setModal(null)
  }

  return (
    <>
      {showWizard && (
        <UploadWizard
          onClose={() => setShowWizard(false)}
          onSuccess={(uploadedFiles, annotation) => {
            const newMaterials = uploadedFiles.map((file, index) => ({
              id: Date.now() + index,
              file_name: file.name,
              type: 'PDF',
              size: (file.size / 1024).toFixed(0) + 'KB',
              status: 'Active',
              uploaded_at: new Date().toLocaleString('en-GB', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: true
              }).replace(',', ' |')
            }))
            setMaterials(prev => [...newMaterials, ...prev])
            setShowWizard(false)
          }}
        />
      )}

      <div style={{ background: '#f8fafc', minHeight: '100vh' }} onClick={() => setOpenMenuId(null)}>

        {/* Modal */}
        {modal && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
          }}>
            <div style={{
              background: 'white', borderRadius: '12px',
              padding: '32px', width: '360px', textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: modal.type === 'delete' ? '#fee2e2' : modal.type === 'suspend' ? '#fef3c7' : '#d1fae5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', fontSize: '22px'
              }}>
                {modal.type === 'delete' ? '🗑' : modal.type === 'suspend' ? '⚠️' : '🔄'}
              </div>
              <h3 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '16px' }}>
                {modal.type === 'delete' ? 'Delete Material' : modal.type === 'suspend' ? 'Suspend Material' : 'Reactivate Material'}
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
                {modal.type === 'delete'
                  ? 'Selected material will be deleted permanently.'
                  : modal.type === 'suspend'
                  ? 'Selected material will be suspended and will not be used by AI.'
                  : 'Selected material will be activated and available for AI use.'}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={() => setModal(null)} style={{
                  padding: '8px 24px', borderRadius: '8px',
                  border: '1px solid #e2e8f0', background: 'white',
                  color: '#64748b', cursor: 'pointer', fontSize: '14px'
                }}>Cancel</button>
                <button onClick={confirmAction} style={{
                  padding: '8px 24px', borderRadius: '8px', border: 'none',
                  background: modal.type === 'delete' ? '#ef4444' : modal.type === 'suspend' ? '#f59e0b' : '#0d9488',
                  color: 'white', cursor: 'pointer', fontSize: '14px'
                }}>Confirm</button>
              </div>
            </div>
          </div>
        )}

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
          }}>AI Materials</span>
          <div style={{ flex: 1 }} />
          <button
            onClick={() => setShowWizard(true)}
            style={{
              background: '#0d9488', color: 'white',
              border: 'none', padding: '8px 16px',
              borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
            }}
          >+ Upload</button>
        </div>

        {/* Breadcrumb */}
        <div style={{ padding: '12px 24px', fontSize: '13px', color: '#94a3b8' }}>
          Home &gt; <span style={{ color: '#1e293b' }}>AI Materials</span>
        </div>

        {/* Content */}
        <div style={{ padding: '0 24px 24px' }}>

          {/* Title + Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ color: '#1e293b', fontSize: '18px' }}>🗂 AI Materials</h2>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'white', border: '1px solid #e2e8f0',
              borderRadius: '8px', padding: '8px 12px'
            }}>
              <span style={{ color: '#94a3b8' }}>🔍</span>
              <input
                type="text" placeholder="Search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                style={{
                  border: 'none', outline: 'none',
                  fontSize: '14px', color: '#1e293b',
                  background: 'transparent', width: '200px'
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div style={{
            background: 'white', borderRadius: '12px',
            border: '1px solid #e2e8f0', overflow: 'hidden'
          }}>
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
                {paginated.map((item) => (
                  <tr key={item.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={tdStyle}>{item.file_name}</td>
                    <td style={tdStyle}>{item.type}</td>
                    <td style={tdStyle}>{item.size}</td>
                    <td style={tdStyle}>{item.uploaded_at}</td>
                    <td style={tdStyle}>
                      <span style={{
                        background: item.status === 'Active' ? '#d1fae5' : '#fef3c7',
                        color: item.status === 'Active' ? '#059669' : '#d97706',
                        padding: '4px 12px', borderRadius: '20px',
                        fontSize: '12px', fontWeight: '500'
                      }}>{item.status}</span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === item.id ? null : item.id) }}
                          style={{
                            background: 'none', border: 'none',
                            cursor: 'pointer', fontSize: '18px', color: '#94a3b8'
                          }}
                        >···</button>
                        {openMenuId === item.id && (
                          <div onClick={(e) => e.stopPropagation()} style={{
                            position: 'absolute', right: 0, top: '28px',
                            background: 'white', borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                            zIndex: 100, minWidth: '180px', overflow: 'hidden',
                            border: '1px solid #e2e8f0'
                          }}>
                            {item.status === 'Active' ? (
                              <button
                                onClick={() => { setModal({ type: 'suspend', item }); setOpenMenuId(null) }}
                                style={menuItem('#f59e0b')}
                              >⏸ Suspend Material</button>
                            ) : (
                              <button
                                onClick={() => { setModal({ type: 'reactivate', item }); setOpenMenuId(null) }}
                                style={menuItem('#0d9488')}
                              >▶ Activate Material</button>
                            )}
                            <button
                              onClick={() => { setModal({ type: 'delete', item }); setOpenMenuId(null) }}
                              style={menuItem('#ef4444')}
                            >🗑 Delete Material</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginTop: '16px',
            fontSize: '13px', color: '#64748b'
          }}>
            <span>Showing 1-{paginated.length} of {filtered.length} items</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={pageBtn(page === 1)}
              >‹</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} style={{
                  width: '32px', height: '32px', borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  background: page === i + 1 ? '#0d9488' : 'white',
                  color: page === i + 1 ? 'white' : '#64748b',
                  cursor: 'pointer', fontSize: '13px'
                }}>{i + 1}</button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={pageBtn(page === totalPages)}
              >›</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

const thStyle = {
  padding: '12px 16px', textAlign: 'left',
  color: '#0d9488', fontWeight: '600', fontSize: '13px'
}
const tdStyle = {
  padding: '14px 16px', color: '#1e293b', fontSize: '14px'
}
const menuItem = (color) => ({
  display: 'block', width: '100%', padding: '10px 16px',
  background: 'none', border: 'none', color,
  fontSize: '14px', textAlign: 'left', cursor: 'pointer'
})
const pageBtn = (disabled) => ({
  width: '32px', height: '32px', borderRadius: '6px',
  border: '1px solid #e2e8f0', background: 'white',
  color: disabled ? '#cbd5e1' : '#64748b',
  cursor: disabled ? 'not-allowed' : 'pointer', fontSize: '16px'
})

export default Materials