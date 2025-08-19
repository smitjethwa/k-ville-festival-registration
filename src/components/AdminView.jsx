import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../AuthContext'
import * as XLSX from 'xlsx'

const ACTIVITIES = ['All','Dance','Singing','Rangoli','Skit','Drawing']

export default function AdminView() {
  const { user } = useAuth()
  const [allowed, setAllowed] = useState(false)
  const [activity, setActivity] = useState('All')
  const [rows, setRows] = useState([])

  useEffect(() => {
    const check = async () => {
      if (!user) return
      const snap = await getDoc(doc(db, 'admins', user.uid))
      setAllowed(snap.exists())
    }
    check()
  }, [user])

  useEffect(() => {
    if (!allowed) return
    const base = collection(db, 'submissions')
    const qy = activity === 'All' ? query(base) : query(base, where('activity','==',activity))
    const unsub = onSnapshot(qy, snap => {
      const list = []
      snap.forEach(d => list.push({ id: d.id, ...d.data() }))
      setRows(list)
    })
    return () => unsub && unsub()
  }, [allowed, activity])

  const exportToExcel = () => {
    const exportData = rows.map(r => ({
      'Name': r.name || '-',
      'Activity': r.activity,
      'Title': r.title || '-',
      'Age': r.age || '-',
      'Gender': r.gender || '-',
      'Flat Number': r.flat_number || '-',
      'Mobile Number': r.mobile_number || '-',
      'Team Name': r.team_name || '-',
      'Team Size': r.team_size || '-',
      'Members': Array.isArray(r.members) && r.members.length > 0 
        ? r.members.map(m => `${m.name} (${m.age || '-'})`).join(', ') 
        : '-'
    }))
    
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Submissions')
    XLSX.writeFile(wb, `carnival-submissions-${activity.toLowerCase()}-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  if (!user) return <div className="container mt-4"><div className="card"><div className="card-body">Please login.</div></div></div>
  if (!allowed) return <div className="container mt-4"><div className="card"><div className="card-body">You are not an admin.</div></div></div>

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title mb-0">Admin — All Submissions</h2>
            <button className="btn btn-success" onClick={exportToExcel} disabled={rows.length === 0}>
              <span className="material-icons">file_download</span> Export to Excel
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">Filter by activity</label>
            <select className="form-select" value={activity} onChange={(e)=>setActivity(e.target.value)}>
              {ACTIVITIES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-custom">
                <tr>
                  <th>User / Team</th>
                  <th>Activity</th>
                  <th>Title</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Flat</th>
                  <th>Mobile</th>
                  <th>Team Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id}>
                    <td>{r.name || '-'}</td>
                    <td><span className="badge bg-primary">{r.activity}</span></td>
                    <td>{r.title || '-'}</td>
                    <td>{r.age || '-'}</td>
                    <td>{r.gender || '-'}</td>
                    <td>{r.flat_number || '-'}</td>
                    <td>{r.mobile_number || '-'}</td>
                    <td>{r.team_name || '-'}</td>
                    <td>
                      {Array.isArray(r.members) && r.members.length > 0 ? (
                        <div>
                          <strong>{r.members.length} members</strong>
                          <ul className="list-unstyled ms-2">
                            {r.members.map((m,i) => (
                              <li key={i}>{m.name} ({m.age || '-'})</li>
                            ))}
                          </ul>
                        </div>
                      ) : '-'}
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
