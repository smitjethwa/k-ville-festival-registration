import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)

  const collapseNavbar = () => {
    const navbarCollapse = document.getElementById('navbarNav')
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show')
    }
  }

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false)
        return
      }
      const snap = await getDoc(doc(db, 'admins', user.uid))
      setIsAdmin(snap.exists())
    }
    checkAdmin()
  }, [user])

  const doLogout = async () => { await logout(); navigate('/') }

  return (
    <nav className="navbar navbar-expand-lg navbar-custom bg-custom">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/images/k-ville-logo.png" alt="K-Ville" height="30" className="me-2" />
          K-Ville Phase III and IV 
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav me-auto">
          <Link to="/events" className="nav-link" onClick={collapseNavbar}><span className="material-icons">event</span> Events</Link>
          <Link to="/contact" className="nav-link" onClick={collapseNavbar}><span className="material-icons">contact_phone</span> Contact</Link>
          {user && (<>
            <Link to="/submit" className="nav-link" onClick={collapseNavbar}><span className="material-icons">add</span> Register</Link>
            <Link to="/my" className="nav-link" onClick={collapseNavbar}><span className="material-icons">list_alt</span> My Entries</Link>
            <Link to="/profile" className="nav-link" onClick={collapseNavbar}><span className="material-icons">person</span> Profile</Link>
            {isAdmin && <Link to="/admin" className="nav-link" onClick={collapseNavbar}><span className="material-icons">dashboard</span> Admin</Link>}
          </>)}
          <Link to="/about" className="nav-link" onClick={collapseNavbar}><span className="material-icons">info</span> About</Link>
        </div>
        <div className="navbar-nav">
          {user ? (
            <button className="btn btn-outline-primary" onClick={doLogout}>Logout</button>
          ) : (
            <Link to="/auth" className="btn btn-primary" onClick={collapseNavbar}>Login / Register</Link>
          )}
        </div>
        </div>
      </div>
    </nav>
  )
}
