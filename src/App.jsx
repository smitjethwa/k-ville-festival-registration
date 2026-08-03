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
import PhotoFrame from './components/PhotoFrame.jsx'

function Home() {
  useEffect(() => {
    document.title = 'K-Ville Festivals - Independence Day'
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
            
            <p className="mb-3">We are proud to announce that K-Ville Society Phase 3 & 4 will be celebrating the 80th Independence Day of India with great patriotism and unity. Let us come together to honor our Constitution, our freedom fighters, and the democratic values that make our nation strong.</p>
            
            <p className="mb-1">📅 <strong>Date: </strong> 15th Aug 2026 (Sat)<br /></p>
            <p className="mb-1">⏰ <strong>Time: </strong> Evening (exact time to be shared)<br /></p>
            <p className="mb-1">📍 <strong>Venue: </strong> Parking Area 'A' Wing<br /></p>

            {/* 🏢 <strong>Business Hub:</strong> 28th Sept (Residents) */}
    <p className="mb-3">

</p>
We invite all residents and families to participate enthusiastically in the celebration and make this occasion meaningful and memorable.
            
<br>
</br>Let us celebrate this day with pride, respect, and unity.
            {/* <p className="mb-3">🙏 <strong>Request:</strong> Kindly contribute your time, talents, and support to ensure smooth arrangements. */}
 {/* Together, let's celebrate Navratri with devotion and joy. </p> */}

            
            <p className="text-center mb-3">
              <strong>जय हिंद! </strong>
              <strong> वंदे मातरम्! </strong>
            </p>
            <p className="text-end text-muted mb-3">- K-Ville Society Phase 3 & 4 Festival Committee</p>
          {/* <Link className="btn btn-primary" to="/submit">Register</Link> */}
        </div>
      </div>

      {/* <div className="mt-5 mb-5">
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title"><span className="material-icons">event</span> 9 Days Festival Schedule</h4>
          </div>
        </div>
        
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card h-100" style={{backgroundColor: 'white', border: '1px solid #dee2e6'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: 'white', color: 'black'}}>
                <h5 className="mb-0">Day 1 - September 22nd, Monday</h5>
                <span className="badge bg-secondary">White</span>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">9:00 AM</span>
                    <span className="badge bg-primary">🪔 Morning Aarti</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">4:30 PM</span>
                    <span className="badge bg-primary">🪔 Devi Sthapna</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">8:30 PM</span>
                    <span className="badge bg-primary">🪔 Evening Aarti</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">9:00 PM</span>
                  <span className="badge bg-dark">💃 Garba & Dandiya</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card h-100" style={{backgroundColor: '#dc3545', border: '1px solid #dc3545'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#dc3545', color: 'white'}}>
                <h5 className="mb-0">Day 2 - September 23rd, Tuesday</h5>
                <span className="badge bg-light text-dark">Red</span>
              </div>
              <div className="card-body" style={{color: 'white'}}>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">9:00 AM</span>
                    <span className="badge bg-light text-dark">🪔 Morning Aarti</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">8:30 PM</span>
                    <span className="badge bg-light text-dark">🪔 Evening Aarti</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">9:00 PM</span>
                  <span className="badge bg-dark">💃 Garba & Dandiya</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card h-100" style={{backgroundColor: '#0d6efd', border: '1px solid #0d6efd'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#0d6efd', color: 'white'}}>
                <h5 className="mb-0">Day 3 - September 24th, Wednesday</h5>
                <span className="badge bg-light text-dark">Royal Blue</span>
              </div>
              <div className="card-body" style={{color: 'white'}}>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">9:00 AM</span>
                    <span className="badge bg-light text-dark">🪔 Morning Aarti</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">4:30 PM</span>
                    <span className="badge bg-light text-dark">🌺 Kunkumarchan & Shreesukta</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">8:30 PM</span>
                    <span className="badge bg-light text-dark">🪔 Evening Aarti</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">9:00 PM</span>
                  <span className="badge bg-dark">💃 Garba & Dandiya</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card h-100" style={{backgroundColor: '#ffc107', border: '1px solid #ffc107'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#ffc107', color: 'black'}}>
                <h5 className="mb-0">Day 4 - September 25th, Thursday</h5>
                <span className="badge bg-dark">Yellow</span>
              </div>
              <div className="card-body" style={{color: 'black'}}>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">9:00 AM</span>
                    <span className="badge bg-dark">🪔 Morning Aarti</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">8:30 PM</span>
                    <span className="badge bg-dark">🪔 Evening Aarti</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">9:00 PM</span>
                  <span className="badge bg-dark">💃 Dandiya Night</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card h-100" style={{backgroundColor: '#198754', border: '1px solid #198754'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#198754', color: 'white'}}>
                <h5 className="mb-0">Day 5 - September 26th, Friday</h5>
                <span className="badge bg-light text-dark">Green</span>
              </div>
              <div className="card-body" style={{color: 'white'}}>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">9:00 AM</span>
                    <span className="badge bg-light text-dark">🪔 Morning Aarti</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-center">
                    <span className="badge bg-light text-dark">👗 Theme: Gujarati Saree</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">8:30 PM</span>
                    <span className="badge bg-light text-dark">🪔 Evening Aarti</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">9:00 PM</span>
                  <span className="badge bg-dark">💃 Garba & Dandiya</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card h-100" style={{backgroundColor: '#6c757d', border: '1px solid #6c757d'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#6c757d', color: 'white'}}>
                <h5 className="mb-0">Day 6 - September 27th, Saturday</h5>
                <span className="badge bg-light text-dark">Grey</span>
              </div>
              <div className="card-body" style={{color: 'white'}}>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">9:00 AM</span>
                    <span className="badge bg-light text-dark">🪔 Morning Aarti</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">5:00 PM</span>
                    <span className="badge bg-light text-dark">🏪 Non Resident Business Stall</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">8:30 PM</span>
                    <span className="badge bg-light text-dark">🪔 Evening Aarti</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">9:00 PM</span>
                  <span className="badge bg-dark">💃 Garba & Dandiya</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card h-100" style={{backgroundColor: '#fd7e14', border: '1px solid #fd7e14'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#fd7e14', color: 'white'}}>
                <h5 className="mb-0">Day 7 - September 28th, Sunday</h5>
                <span className="badge bg-light text-dark">Orange</span>
              </div>
              <div className="card-body" style={{color: 'white'}}>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">9:00 AM</span>
                    <span className="badge bg-light text-dark">🪔 Morning Aarti</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">5:00 PM</span>
                    <span className="badge bg-light text-dark">🎊 Bhondla</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">6:00 PM</span>
                    <span className="badge bg-light text-dark">🏪 Resident Business Stall</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">8:30 PM</span>
                    <span className="badge bg-light text-dark">🪔 Evening Aarti</span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="badge bg-dark">💃 Garba Night with Best Dress Competition</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card h-100" style={{backgroundColor: '#20c997', border: '1px solid #20c997'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#20c997', color: 'white'}}>
                <h5 className="mb-0">Day 8 - September 29th, Monday</h5>
                <span className="badge bg-light text-dark">Peacock Green</span>
              </div>
              <div className="card-body" style={{color: 'white'}}>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">9:00 AM</span>
                    <span className="badge bg-light text-dark">🪔 Morning Aarti</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">8:30 PM</span>
                    <span className="badge bg-light text-dark">🪔 Evening Aarti</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">9:00 PM</span>
                  <span className="badge bg-dark">🎬 Bollywood Garba</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card h-100" style={{backgroundColor: '#e83e8c', border: '1px solid #e83e8c'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{backgroundColor: '#e83e8c', color: 'white'}}>
                <h5 className="mb-0">Day 9 - September 30th, Tuesday</h5>
                <span className="badge bg-light text-dark">Pink</span>
              </div>
              <div className="card-body" style={{color: 'white'}}>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">9:00 AM</span>
                    <span className="badge bg-light text-dark">🪔 Morning Aarti</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">6:30 PM</span>
                    <span className="badge bg-light text-dark">🙏 Kanyapoojan</span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">8:30 PM</span>
                    <span className="badge bg-light text-dark">🪔 Evening Aarti</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">9:00 PM</span>
                  <span className="badge bg-dark">💃 Garba & Dandiya</span>
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
            </div>
          </div>
        </div>
      </div> */}
      
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

function PhotoFrameWithTitle() {
  useEffect(() => { document.title = 'Photo Frame - K-Ville Festivals' }, [])
  return <PhotoFrame />
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
        <Route path="/frame-it" element={<PhotoFrameWithTitle />} />
      </Routes>
      {/* <footer className="text-center py-4 text-muted">Built with Firebase <span className="material-icons">whatshot</span> & React</footer> */}
    </AuthProvider>
  )
}

export default function App() {
  return <AppWithAnalytics />
}
