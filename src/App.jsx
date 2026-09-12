import React, { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import NavBar from './components/NavBar.jsx'
import AuthPage from './components/AuthPage.jsx'
import ActivityForm from './components/ActivityForm.jsx'
import MySubmissions from './components/MySubmissions.jsx'

import ProfilePage from './components/ProfilePage.jsx'
import EventDetails from './components/EventDetails.jsx'
import AboutUs from './components/AboutUs.jsx'
import ContactUs from './components/ContactUs.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import BusinessHub from './components/BusinessHub.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'

function Home() {
  useEffect(() => {
    document.title = 'K-Ville Festivals - Ganesh Chaturthi 2026'
  }, [])

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title"><span className="material-icons">celebration</span> Ganesh Chaturthi Festival 2026 - Event Registration</h1>

          <p className="text-center mb-3">🌸✨ <strong>गणपती बाप्पा मोरया!</strong> ✨🌸</p>
          <p className="text-muted">

            Dear Society Members, 🙏</p>

          <p className="mb-3">We are delighted to announce that our society will be celebrating the <strong>Ganesh Chaturthi Festival</strong> with great devotion and joy this year. Let us all come together to welcome <strong>Bappa</strong> and make these days truly memorable with unity, devotion, and festivities!</p>

          <p className="mb-3">📅 <strong>Festival Dates:</strong> 14th September, 2026 to 19th September, 2026
          </p><p className="mb-3">

            Let us all participate actively with full enthusiasm, involve our families, and make this celebration a grand success. 🎊

          </p>

          <p className="mb-3">🙏 <strong>Request:</strong> Kindly contribute your time, talents, and support to ensure smooth arrangements.
            Together, let's welcome Bappa with devotion and celebrate with love and harmony.

          </p>
          <p className="text-muted">Register for Dance, Singing, Fashion Show/Fancy Dress, Skit or Business Hub. Multiple entries allowed — register your full team or enter multiple events!</p>

          <p className="text-center mb-3"><strong>गणपती बाप्पा मोरया! मंगल मूर्ती मोरया!</strong>

          </p>

          <p className="text-end text-muted mb-3">- K-Ville Society Phase 3 & 4 Festival Committee</p>
          <Link className="btn btn-primary" to="/submit">Register</Link>
        </div>
      </div>

      <div className="mt-5 mb-5">
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title"><span className="material-icons">event</span> 🎉 Festival Schedule — Ganpati 2026</h4>
            <p className="text-muted mb-0">K-Ville Phase 3 &amp; 4 · 14th – 19th September 2026</p>
          </div>
        </div>

        <div className="row">

          {/* Day 1 */}
          <div className="col-md-6 mb-4">
            <div className="card border-warning h-100">
              <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                <h5 className="mb-0">🕉️ Day 1 — 14th September</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#fff7ed' }}>
                  <span className="fw-bold text-warning">04:30 PM</span>
                  <span className="badge fs-6" style={{ background: '#f97316' }}>🙏 Ganpati Arrival</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#fff7ed' }}>
                  <span className="fw-bold text-warning">08:00 PM</span>
                  <span className="badge fs-6" style={{ background: '#7c3aed' }}>🎶 Bhajan Sandhya</span>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="col-md-6 mb-4">
            <div className="card border-primary h-100">
              <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
                <h5 className="mb-0">🪔 Day 2 — 15th September</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#eff6ff' }}>
                  <span className="fw-bold text-primary">09:00 AM</span>
                  <span className="badge bg-success fs-6">🪔 Morning Aarti</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#eff6ff' }}>
                  <span className="fw-bold text-primary">10:00 AM</span>
                  <span className="badge fs-6" style={{ background: '#0891b2' }}>🔥 Satyanarayan Pooja</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#eff6ff' }}>
                  <span className="fw-bold text-primary">07:45 PM</span>
                  <span className="badge bg-success fs-6">🪔 Evening Aarti</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#eff6ff' }}>
                  <span className="fw-bold text-primary">08:00 PM</span>
                  <span className="badge fs-6" style={{ background: '#db2777' }}>💃 Cultural Program</span>
                </div>
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="col-md-6 mb-4">
            <div className="card border-success h-100">
              <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                <h5 className="mb-0">🛍️ Day 3 — 16th September</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#f0fdf4' }}>
                  <span className="fw-bold text-success">09:00 AM</span>
                  <span className="badge bg-success fs-6">🪔 Morning Aarti</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#f0fdf4' }}>
                  <span className="fw-bold text-success">07:45 PM</span>
                  <span className="badge bg-success fs-6">🪔 Evening Aarti</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#f0fdf4' }}>
                  <span className="fw-bold text-success">08:00 PM</span>
                  <span className="badge fs-6" style={{ background: '#d97706' }}>🛍️ Business Stalls</span>
                </div>
              </div>
            </div>
          </div>

          {/* Day 4 */}
          <div className="col-md-6 mb-4">
            <div className="card h-100" style={{ borderColor: '#7c3aed' }}>
              <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                <h5 className="mb-0">🎵 Day 4 — 17th September</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#faf5ff' }}>
                  <span className="fw-bold" style={{ color: '#7c3aed' }}>09:00 AM</span>
                  <span className="badge bg-success fs-6">🪔 Morning Aarti</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#faf5ff' }}>
                  <span className="fw-bold" style={{ color: '#7c3aed' }}>07:45 PM</span>
                  <span className="badge bg-success fs-6">🪔 Evening Aarti</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#faf5ff' }}>
                  <span className="fw-bold" style={{ color: '#7c3aed' }}>08:00 PM</span>
                  <span className="badge fs-6" style={{ background: '#7c3aed' }}>🎵 Antakshari</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#faf5ff' }}>
                  <span className="fw-bold" style={{ color: '#7c3aed' }}>08:00 PM</span>
                  <span className="badge fs-6" style={{ background: '#0891b2' }}>🎯 Fun Games</span>
                </div>
              </div>
            </div>
          </div>

          {/* Day 5 */}
          <div className="col-md-6 mb-4">
            <div className="card h-100" style={{ borderColor: '#db2777' }}>
              <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #db2777, #be185d)' }}>
                <h5 className="mb-0">🎟️ Day 5 — 18th September</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#fdf2f8' }}>
                  <span className="fw-bold" style={{ color: '#db2777' }}>09:00 AM</span>
                  <span className="badge bg-success fs-6">🪔 Morning Aarti</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#fdf2f8' }}>
                  <span className="fw-bold" style={{ color: '#db2777' }}>07:45 PM</span>
                  <span className="badge bg-success fs-6">🪔 Evening Aarti</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#fdf2f8' }}>
                  <span className="fw-bold" style={{ color: '#db2777' }}>08:00 PM</span>
                  <span className="badge fs-6" style={{ background: '#db2777' }}>🎟️ Housie Game</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#fdf2f8' }}>
                  <span className="fw-bold" style={{ color: '#db2777' }}>08:00 PM</span>
                  <span className="badge fs-6" style={{ background: '#7c3aed' }}>🎤 Karaoke Night</span>
                </div>
              </div>
            </div>
          </div>

          {/* Day 6 */}
          <div className="col-md-6 mb-4">
            <div className="card border-danger h-100">
              <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}>
                <h5 className="mb-0">🙏 Day 6 — 19th September</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#fff1f2' }}>
                  <span className="fw-bold text-danger">09:00 AM</span>
                  <span className="badge bg-success fs-6">🪔 Morning Aarti</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#fff1f2' }}>
                  <span className="fw-bold text-danger">05:00 PM</span>
                  <span className="badge fs-6" style={{ background: '#f97316' }}>🥁 Ganpati Visarjan (Dhol-Tasha)</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style={{ background: '#fff1f2' }}>
                  <span className="fw-bold text-danger">08:00 PM</span>
                  <span className="badge fs-6" style={{ background: '#15803d' }}>🍛 Mahaprasad</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="card mb-4 text-center py-3" style={{ background: 'linear-gradient(135deg, #fff7ed, #fef9c3)', border: '1px solid #fde68a' }}>
          <div className="card-body">
            <p className="mb-0 fw-bold" style={{ color: '#92400e', fontSize: '1.1rem' }}>
              🙏🌺 गणपती बाप्पा मोरया! 🌺🙏
            </p>
            <p className="text-muted mb-0 small">K-Ville Phase 3 &amp; 4 Festival Committee</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h6 className="fw-bold">K-Ville Festivals</h6>
              <p className="text-muted small mb-2">Celebrating community spirit through festivals</p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold">Quick Links</h6>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/about" className="text-decoration-none small">About Us</Link>
                <Link to="/contact" className="text-decoration-none small">Contact</Link>
                <Link to="/privacy" className="text-decoration-none small">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Wrapper components with page titles
function EventDetailsWithTitle() {
  useEffect(() => { document.title = 'Event Details - K-Ville Festivals' }, [])
  return <EventDetails />
}

function AboutUsWithTitle() {
  useEffect(() => { document.title = 'About Us - K-Ville Festivals' }, [])
  return <AboutUs />
}

function ContactUsWithTitle() {
  useEffect(() => { document.title = 'Contact Us - K-Ville Festivals' }, [])
  return <ContactUs />
}

function BusinessHubWithTitle() {
  useEffect(() => { document.title = 'Business Hub - K-Ville Festivals' }, [])
  return <BusinessHub />
}

function PrivacyPolicyWithTitle() {
  useEffect(() => { document.title = 'Privacy Policy - K-Ville Festivals' }, [])
  return <PrivacyPolicy />
}

function AuthPageWithTitle() {
  useEffect(() => { document.title = 'Login - K-Ville Festivals' }, [])
  return <AuthPage />
}

function ProfilePageWithTitle() {
  useEffect(() => { document.title = 'My Profile - K-Ville Festivals' }, [])
  return <ProfilePage />
}

function ActivityFormWithTitle() {
  useEffect(() => { document.title = 'Register Event - K-Ville Festivals' }, [])
  return <ActivityForm />
}

function MySubmissionsWithTitle() {
  useEffect(() => { document.title = 'My Submissions - K-Ville Festivals' }, [])
  return <MySubmissions />
}

function AdminDashboardWithTitle() {
  useEffect(() => { document.title = 'Admin Dashboard - K-Ville Festivals' }, [])
  return <AdminDashboard />
}



function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="container mt-4"><div className="card"><div className="card-body">Loading…</div></div></div>
  if (!user) return <div className="container mt-4"><div className="card"><div className="card-body">Please login first.</div></div></div>
  return children
}

function AppWithAnalytics() {
  const location = useLocation()

  useEffect(() => {
    const GA_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    if (window.gtag && GA_ID) {
      window.gtag('config', GA_ID, {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])

  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventDetailsWithTitle />} />
        <Route path="/about" element={<AboutUsWithTitle />} />
        <Route path="/contact" element={<ContactUsWithTitle />} />
        <Route path="/business" element={<BusinessHubWithTitle />} />
        <Route path="/privacy" element={<PrivacyPolicyWithTitle />} />
        <Route path="/auth" element={<AuthPageWithTitle />} />
        <Route path="/profile" element={<RequireAuth><ProfilePageWithTitle /></RequireAuth>} />
        <Route path="/submit" element={<RequireAuth><ActivityFormWithTitle /></RequireAuth>} />
        <Route path="/my" element={<RequireAuth><MySubmissionsWithTitle /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth><AdminDashboardWithTitle /></RequireAuth>} />
      </Routes>
      {/* <footer className="text-center py-4 text-muted">Built with Firebase <span className="material-icons">whatshot</span> & React</footer> */}
    </AuthProvider>
  )
}

export default function App() {
  return <AppWithAnalytics />
}
