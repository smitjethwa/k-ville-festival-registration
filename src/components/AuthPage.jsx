import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

export default function AuthPage() {
  const { loginGoogle } = useAuth()
  const navigate = useNavigate()
  const [err, setErr] = useState('')

  const google = async () => {
    try {
      const cred = await loginGoogle()
      await setDoc(doc(db, 'users', cred.user.uid), { email: cred.user.email, created_at: new Date() }, { merge: true })
      navigate('/profile')
    } catch (e) {
      if (e.code === 'auth/popup-blocked') {
        setErr('Popup was blocked by browser. Please allow popups and try again.')
      } else {
        setErr(e.message)
      }
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="card-title">Login / Register</h2>
              <p className="text-muted mb-4">Sign in with your Google account to continue</p>
              {err && <div className="alert alert-danger">⚠ {err}</div>}
              <button className="btn btn-primary btn-lg" onClick={google}>
                <span className="material-icons">login</span> Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
