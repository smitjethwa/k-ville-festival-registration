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
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">My Entries</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Activity</th>
                  <th>Title</th>
                  <th>Team Details</th>
                  <th>Submitted At</th>
                  <th>Updated At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, index) => (
                  <tr key={it.id}>
                    <td>{index + 1}</td>
                    <td><span className="badge bg-primary">{it.activity}</span></td>
                    <td>{it.title || '-'}</td>
                    <td>
                      {it.team_name || it.members?.length > 0 ? (
                        <div>
                          {it.team_name && <><strong>{it.team_name}</strong><br /></>}
                          {it.members?.length > 0 && (
                            <small className="text-muted">
                              {it.members.map(m => `${m.first_name || m.name || ''} ${m.last_name || ''}`.trim()).join(', ')}
                            </small>
                          )}
                        </div>
                      ) : '-'}
                    </td>
                    <td>
                      {it.created_at ? new Date(it.created_at.seconds * 1000).toLocaleString() : '-'}
                    </td>
                    <td>
                      {it.updated_at ? new Date(it.updated_at.seconds * 1000).toLocaleString() : '-'}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>setEditing(it)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>del(it.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
