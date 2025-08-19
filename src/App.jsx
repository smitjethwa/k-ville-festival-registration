import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import NavBar from './components/NavBar.jsx'
import AuthPage from './components/AuthPage.jsx'
import ActivityForm from './components/ActivityForm.jsx'
import MySubmissions from './components/MySubmissions.jsx'
import AdminView from './components/AdminView.jsx'
import ProfilePage from './components/ProfilePage.jsx'
import EventDetails from './components/EventDetails.jsx'
import AboutUs from './components/AboutUs.jsx'
import ContactUs from './components/ContactUs.jsx'
import AdminManagement from './components/AdminManagement.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import BusinessHub from './components/BusinessHub.jsx'

function Home() {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title"><span className="material-icons">celebration</span> Ganesh Chaturthi Festival 2025 - Event Registration</h1>
          <p className="text-muted">Date: 27th August, 2025 to 31st August, 2025</p>
          <p className="text-muted">Register for Dance, Singing, Rangoli, Skit, Fancy Dress or Drawing. One entry per activity per person.</p>
          <Link className="btn btn-primary" to="/submit">Register</Link>
        </div>
      </div>

      <div className="row mt-5 mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title"><span className="material-icons">event</span> 5-Day Festival Schedule</h4>
              <div className="row">
                <div className="col mb-3">
                  <div className="card border-primary">
                    <div className="card-header bg-primary text-white text-center">
                      <strong>Day 1</strong><br />
                      <small>27 Aug 2025</small>
                    </div>
                    <div className="card-body p-2">
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">08:00 AM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">02:00 PM</small>
                        <span className="badge bg-info">🎨 Rangoli</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">09:00 PM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-3">
                  <div className="card border-success">
                    <div className="card-header bg-success text-white text-center">
                      <strong>Day 2</strong><br />
                      <small>28 Aug 2025</small>
                    </div>
                    <div className="card-body p-2">
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">08:00 AM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">02:00 PM</small>
                        <span className="badge bg-info">🎨 Rangoli</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">09:00 PM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-3">
                  <div className="card border-info">
                    <div className="card-header bg-info text-white text-center">
                      <strong>Day 3</strong><br />
                      <small>29 Aug 2025</small>
                    </div>
                    <div className="card-body p-2">
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">08:00 AM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">02:00 PM</small>
                        <span className="badge bg-info">🎨 Rangoli</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">09:00 PM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-3">
                  <div className="card border-warning">
                    <div className="card-header bg-warning text-dark text-center">
                      <strong>Day 4</strong><br />
                      <small>30 Aug 2025</small>
                    </div>
                    <div className="card-body p-2">
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">08:00 AM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">02:00 PM</small>
                        <span className="badge bg-info">🎨 Rangoli</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">09:00 PM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-3">
                  <div className="card border-danger">
                    <div className="card-header bg-danger text-white text-center">
                      <strong>Day 5</strong><br />
                      <small>31 Aug 2025</small>
                    </div>
                    <div className="card-body p-2">
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">08:00 AM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">02:00 PM</small>
                        <span className="badge bg-info">🎨 Rangoli</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <small className="text-muted">09:00 PM</small>
                        <span className="badge bg-success">🪔 Aarti</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="container mt-4"><div className="card"><div className="card-body">Loading…</div></div></div>
  if (!user) return <div className="container mt-4"><div className="card"><div className="card-body">Please login first.</div></div></div>
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/business" element={<BusinessHub />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/submit" element={<RequireAuth><ActivityForm /></RequireAuth>} />
        <Route path="/my" element={<RequireAuth><MySubmissions /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
        <Route path="/admin-manage" element={<RequireAuth><AdminManagement /></RequireAuth>} />
      </Routes>
      {/* <footer className="text-center py-4 text-muted">Built with Firebase <span className="material-icons">whatshot</span> & React</footer> */}
    </AuthProvider>
  )
}
