import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import { db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function ProfilePage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name:'', flat_number:'', mobile_number:'' })
  const [msg, setMsg] = useState('')
  const [isEditing, setIsEditing] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!user) return
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        const u = snap.data()
        setForm(f => ({...f, name: u.name || '', flat_number: u.flat_number || '', mobile_number: u.mobile_number || ''}))
        // If user has profile data, show in view mode
        if (u.name && u.flat_number && u.mobile_number) {
          setIsEditing(false)
        }
      }
    }
    load()
  }, [user])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onFlatChange = (field, value) => {
    const parts = form.flat_number.split('-')
    const wing = field === 'wing' ? value : (parts[0] || '')
    const flatNum = field === 'flat_num' ? value : (parts[1] || '')
    setForm(prev => ({ ...prev, flat_number: `${wing}-${flatNum}` }))
  }

  const save = async (e) => { 
    e.preventDefault()
    const { wing, flat_num, ...cleanForm } = form
    await setDoc(doc(db, 'users', user.uid), { ...cleanForm, updated_at: new Date() }, { merge: true })
    setMsg('Profile saved ✅')
    setIsEditing(false)
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">My Profile</h2>
              {!isEditing ? (
                <div>
                  <div className="mb-3">
                    <strong>Name:</strong> {form.name || 'Not set'}
                  </div>
                  <div className="mb-3">
                    <strong>Flat Number:</strong> {form.flat_number || 'Not set'}
                  </div>
                  <div className="mb-3">
                    <strong>Mobile Number:</strong> {form.mobile_number || 'Not set'}
                  </div>
                  <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                    <span className="material-icons">edit</span> Edit Profile
                  </button>
                </div>
              ) : (
              <form onSubmit={save}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" name="name" value={form.name} onChange={onChange} maxLength={50} required/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Wing</label>
                    <select className="form-select" value={form.flat_number.split('-')[0] || ''} onChange={(e) => onFlatChange('wing', e.target.value)} required>
                      <option value="">Select</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Flat Number</label>
                    <input className="form-control" value={form.flat_number.split('-')[1] || ''} onChange={(e) => onFlatChange('flat_num', e.target.value)} required/>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input className="form-control" name="mobile_number" value={form.mobile_number} onChange={onChange} required/>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary" type="submit">Save</button>
                  <button className="btn btn-secondary" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
              )}
              {msg && <div className="alert alert-success mt-3">{msg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
