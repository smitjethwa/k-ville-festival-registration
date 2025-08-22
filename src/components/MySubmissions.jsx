import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../AuthContext'
import ActivityForm from './ActivityForm.jsx'

export default function MySubmissions() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'submissions'), where('uid', '==', user.uid))
    const unsub = onSnapshot(q, (snap) => {
      const rows = []
      snap.forEach((d) => rows.push({ id: d.id, ...d.data() }))
      setItems(rows)
    })
    return () => unsub()
  }, [user])

  const del = async (id) => { if (!confirm('Delete this entry?')) return; await deleteDoc(doc(db, 'submissions', id)) }

  if (editing) return <ActivityForm editDoc={editing} onBack={() => setEditing(null)} />

  return (
    <div className="container mt-4 mb-5">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">My Entries ({items.length})</h2>
        </div>
      </div>
      
      {items.length === 0 ? (
        <div className="card">
          <div className="card-body text-center text-muted">
            <span className="material-icons" style={{fontSize: '48px'}}>event_busy</span>
            <p className="mt-2">No submissions yet. Register for an event to get started!</p>
          </div>
        </div>
      ) : (
        <div className="row">
          {items.map((it, index) => (
            <div key={it.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-primary me-2">{it.activity}</span>
                    <small className="text-muted">Entry #{index + 1}</small>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>setEditing(it)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={()=>del(it.id)}>Delete</button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <strong>Name:</strong><br />
                      <span>{it.name || `${it.first_name || ''} ${it.last_name || ''}`.trim()}</span>
                    </div>
                    <div className="col-3">
                      <strong>Age:</strong><br />
                      <span>{it.age}</span>
                    </div>
                    <div className="col-3">
                      <strong>Gender:</strong><br />
                      <span>{it.gender}</span>
                    </div>
                  </div>
                  
                  <hr className="my-3" />
                  
                  <div className="row">
                    <div className="col-6">
                      <strong>Flat:</strong><br />
                      <span>{it.flat_number}</span>
                    </div>
                    <div className="col-6">
                      <strong>Mobile:</strong><br />
                      <span>{it.mobile_number}</span>
                    </div>
                  </div>
                  
                  {it.title && (
                    <>
                      <hr className="my-3" />
                      <div>
                        <strong>Title/Song:</strong><br />
                        <span>{it.title}</span>
                      </div>
                    </>
                  )}
                  
                  {it.team_name && (
                    <>
                      <hr className="my-3" />
                      <div>
                        <strong>{it.activity === 'Business Hub' ? 'Business Name:' : 'Team Name:'}</strong><br />
                        <span>{it.team_name}</span>
                      </div>
                    </>
                  )}
                  
                  {it.activity === 'Business Hub' && (
                    <>
                      <hr className="my-3" />
                      <div className="row">
                        <div className="col-6">
                          <strong>Stall Type:</strong><br />
                          <span>{it.stall_type || '-'}</span>
                        </div>
                        <div className="col-6">
                          <strong>Food Stall:</strong><br />
                          <span className={`badge ${it.is_food_stall === 'Yes' ? 'bg-success' : 'bg-secondary'}`}>
                            {it.is_food_stall || 'No'}
                          </span>
                        </div>
                      </div>
                      {it.other_requirements && (
                        <div className="mt-2">
                          <strong>Requirements:</strong><br />
                          <span>{it.other_requirements}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  {it.members && it.members.length > 1 && (
                    <>
                      <hr className="my-3" />
                      <div>
                        <strong>Team Members ({it.members.length}):</strong><br />
                        <div className="mt-2">
                          {it.members.map((m, i) => (
                            <div key={i} className="d-flex justify-content-between border-bottom py-1">
                              <span>{`${m.first_name || m.name || ''} ${m.last_name || ''}`.trim()}</span>
                              <small className="text-muted">{m.age} • {m.flat_number}</small>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="card-footer text-muted small">
                  <div className="d-flex justify-content-between">
                    <span>Submitted: {it.created_at ? new Date(it.created_at.seconds * 1000).toLocaleDateString() : '-'}</span>
                    {it.updated_at && (
                      <span>Updated: {new Date(it.updated_at.seconds * 1000).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
