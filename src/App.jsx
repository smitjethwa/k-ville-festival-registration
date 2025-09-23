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
    document.title = 'K-Ville Festivals - Navratri'
  }, [])

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title"><span className="material-icons">celebration</span> K-Ville Festivals</h1>
          <br></br>
          {/* <p className="text-center mb-3">🌺✨ <strong>Jai Mata Di!</strong> ✨🌺</p> */}
            <p className="text-muted">

Dear Society Members, 🙏</p>
            
            <p className="mb-3">We are delighted to announce that our society will be celebrating the <strong>Navratri Festival</strong> with great devotion and joy this year. Let us all come together to celebrate <strong>Maa Durga</strong> and make these nine nights truly memorable with unity, devotion, and festivities!</p>
            
            <p className="mb-3">📅 <strong>Festival Dates:</strong> 22th September 2025 to 1st October 2025<br />
            🏢 <strong>Business Hub:</strong> 27th Sept (Saturday)<br />
            🎡 <strong>Fun Fair:</strong> 28th Sept (Sunday)
    </p><p className="mb-3">

Let us all participate actively with full enthusiasm, involve our families, and make this celebration a grand success. 🎊  

</p>
            
            <p className="mb-3">🙏 <strong>Request:</strong> Kindly contribute your time, talents, and support to ensure smooth arrangements.
 Together, let's celebrate Navratri with devotion and joy. 

</p>

            
            <p className="text-center mb-3"><strong>जय माता दी! नवरात्रीच्या हार्दिक शुभेच्छा! 🌸🙏✨</strong>  

</p>
            
            <p className="text-end text-muted mb-3">- K-Ville Society Phase 3 & 4 Festival Committee</p>
          {/* <Link className="btn btn-primary" to="/submit">Register</Link> */}
        </div>
      </div>

      <div className="mt-5 mb-5">
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title"><span className="material-icons">event</span> 9 Days Festival Schedule</h4>
            <h6>Will Update soon</h6>
          </div>
        </div>
        {/* <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card border-primary h-100">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">🎉 Day 1 - 27 Aug 2025</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">03:00 PM</span>
                        <span className="badge bg-success fs-6">🕉️ Ganpatiji Arrival</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:45 PM</span>
                        <span className="badge bg-info fs-6">🎮 Children's Game</span>
                      </div>

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

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:30 PM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:45 PM</span>
                        <span className="badge bg-info fs-6">🎲 Housie Game</span>
                      </div>

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

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:00 PM</span>
                        <span className="badge bg-info fs-6">🎡 Fun Fair</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:30 PM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:45 PM</span>
                        <span className="badge bg-warning fs-6">🪑 Musical Chairs</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:45 PM</span>
                        <span className="badge bg-warning fs-6">🎵 Antakshari</span>
                      </div>

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

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">11:00 AM</span>
                        <span className="badge bg-primary fs-6">🙏 Satyanarayan Pooja</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">11:00 AM</span>
                        <span className="badge bg-danger fs-6">🌺 Rangoli Competition</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">11:00 AM</span>
                        <span className="badge bg-danger fs-6">🎨 Drawing Competition</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">05:30 PM</span>
                        <span className="badge bg-danger fs-6">🎪 Cultural Program</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">05:30 PM</span>
                        <span className="badge bg-danger fs-6">🎭 Drama Performance</span>
                      </div>

                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold">07:30 PM</span>
                        <span className="badge bg-success fs-6">🪔 Aarti</span>
                      </div>

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

                    </div>
                  </div>
            </div>
          </div>
        </div>
*/}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-center">
                <img src="/images/schedule.png" alt="Festival Schedule" className="img-fluid rounded" style={{maxHeight: '600px'}} />
              </div>
              {/* <div className="col-md-6 text-center">
                <img src="/images/schedule_mr.png" alt="Festival Schedule" className="img-fluid rounded" style={{maxHeight: '600px'}} />
              </div> */}
            </div>
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
