import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore'

export default function AdminManagement() {
  const [admins, setAdmins] = useState([])
  const [users, setUsers] = useState([])
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadAdmins()
    loadUsers()
  }, [])

  const loadAdmins = async () => {
    const snap = await getDocs(collection(db, 'admins'))
    const adminIds = snap.docs.map(doc => doc.id)
    
    const userSnap = await getDocs(collection(db, 'users'))
    const adminUsers = userSnap.docs
      .filter(doc => adminIds.includes(doc.id))
      .map(doc => ({ id: doc.id, ...doc.data() }))
    
    setAdmins(adminUsers)
  }

  const loadUsers = async () => {
    const snap = await getDocs(collection(db, 'users'))
    const userList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setUsers(userList)
  }

  const addAdmin = async (e) => {
    e.preventDefault()
    try {
      const user = users.find(u => u.email === newAdminEmail)
      if (!user) {
        setError('User not found. They must sign in to the app first.')
        setTimeout(() => setError(''), 3000)
        return
      }
      
      await setDoc(doc(db, 'admins', user.id), {})
      setMsg(`${newAdminEmail} added as admin`)
      setNewAdminEmail('')
      loadAdmins()
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      setError(err.message)
      setTimeout(() => setError(''), 3000)
    }
  }

  const removeAdmin = async (adminId) => {
    try {
      await deleteDoc(doc(db, 'admins', adminId))
      setMsg('Admin removed successfully')
      loadAdmins()
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      setError(err.message)
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title"><span className="material-icons">admin_panel_settings</span> Admin Management</h2>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <h5>Add New Admin</h5>
              <form onSubmit={addAdmin}>
                <div className="mb-3">
                  <label className="form-label">User Email</label>
                  <input
                    className="form-control"
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="Enter user email"
                    required
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  <span className="material-icons">person_add</span> Add Admin
                </button>
              </form>
            </div>

            <div className="col-md-6">
              <h5>Current Admins ({admins.length})</h5>
              {admins.length === 0 ? (
                <p className="text-muted">No admins found</p>
              ) : (
                <div className="list-group">
                  {admins.map(admin => (
                    <div key={admin.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{admin.name || 'No name'}</strong>
                        <br />
                        <small className="text-muted">{admin.email}</small>
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeAdmin(admin.id)}
                      >
                        <span className="material-icons">person_remove</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {msg && <div className="alert alert-success mt-3">{msg}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  )
}