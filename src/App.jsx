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
          
          <p className="text-center mb-3">🌸✨ <strong>Ganpati Bappa Morya!</strong> ✨🌸</p>
            <p className="text-muted">

Dear Society Members, 🙏</p>
            
            <p className="mb-3">We are delighted to announce that our society will be celebrating the <strong>Ganesh Chaturthi Festival</strong> with great devotion and joy this year. Let us all come together to welcome <strong>Bappa</strong> and make these days truly memorable with unity, devotion, and festivities!</p>
            
            <p className="mb-3">📅 <strong>Festival Dates:</strong> 27th August, 2025 to 31st August, 2025
    </p><p className="mb-3">

Let us all participate actively with full enthusiasm, involve our families, and make this celebration a grand success. 🎊  

</p>
            
            <p className="mb-3">🙏 <strong>Request:</strong> Kindly contribute your time, talents, and support to ensure smooth arrangements.
 Together, let's welcome Bappa with devotion and celebrate with love and harmony. 

</p>
          <p className="text-muted">Register for Dance, Singing, Rangoli, Skit, Fancy Dress, Drawing or Business Hub. One entry per activity per person.</p>
            
            <p className="text-center mb-3"><strong>Ganpati Bappa Morya! Mangal Murti Morya!</strong>  

</p>
            
            <p className="text-end text-muted mb-3">- K-Ville Society Phase 3 & 4 Festival Committee</p>
          <Link className="btn btn-primary" to="/submit">Register</Link>
        </div>
      </div>

      <div className="mt-5 mb-5">
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title"><span className="material-icons">event</span> 5-Day Festival Schedule</h4>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card border-primary h-100">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">🎉 Day 1 - 27 Aug 2025</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">03:00 PM</span>
                        <span className="badge bg-success fs-6">🐘 Ganpatiji Arrival</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:40 PM</span>
                        <span className="badge bg-info fs-6">🎮 Children's Game</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                  </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card border-success h-100">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">🌟 Day 2 - 28 Aug 2025</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">09:00 AM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:30 PM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:45 PM</span>
                        <span className="badge bg-info fs-6">🎲 Housie Game</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                  </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card border-info h-100">
                  <div className="card-header bg-info text-white">
                    <h5 className="mb-0">🎊 Day 3 - 29 Aug 2025</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">09:00 AM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:00 PM</span>
                        <span className="badge bg-info fs-6">🎡 Fun Fair</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:30 PM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:45 PM</span>
                        <span className="badge bg-warning fs-6">🪑 Musical Chairs</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:45 PM</span>
                        <span className="badge bg-warning fs-6">🎵 Antakshari</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                  </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card border-warning h-100">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="mb-0">🎭 Day 4 - 30 Aug 2025 (Main Event Day)</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">09:00 AM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">11:00 AM</span>
                        <span className="badge bg-primary fs-6">🙏 Satyanarayan Pooja</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">11:00 AM</span>
                        <span className="badge bg-danger fs-6">🌺 Rangoli Competition</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">11:00 AM</span>
                        <span className="badge bg-danger fs-6">🎨 Drawing Competition</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">05:30 PM</span>
                        <span className="badge bg-danger fs-6">🎪 Cultural Program</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">05:30 PM</span>
                        <span className="badge bg-danger fs-6">🎭 Drama Performance</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:30 PM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                  </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-danger">
                  <div className="card-header bg-danger text-white">
                    <h5 className="mb-0">🙏 Day 5 - 31 Aug 2025 (Visarjan)</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">09:00 AM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold">04:30 PM</span>
                      <span className="badge bg-info fs-6">🚶‍♂️ Visarjan Procession</span>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">08:00 PM</span>
                        <span className="badge bg-success fs-6">🍽️ Mahaprasad</span>
                      </div>
                      <small className="text-muted">📍 Venue: [Add venue]</small>
                    </div>
                  </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-center">
                <img src="/images/schedule.png" alt="Festival Schedule" className="img-fluid rounded" style={{maxHeight: '600px'}} />
              </div>
              <div className="col-md-6 text-center">
                <img src="/images/schedule_mr.png" alt="Festival Schedule" className="img-fluid rounded" style={{maxHeight: '600px'}} />
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
