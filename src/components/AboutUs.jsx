import React from 'react'

export default function AboutUs() {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title"><span className="material-icons">info</span> About Us</h1>
          <p className="text-muted">Learn more about our festival registration system.</p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">K-Ville Festivals Registration System</h5>
          <p>
            Our modern web application streamlines the registration process for society festival events, 
            making it easy for residents to participate in cultural activities and competitions.
          </p>
          
          <h6 className="mt-4">🔐 Authentication:</h6>
          <ul>
            <li>Google Sign-in Only - Secure authentication via Gmail accounts</li>
          </ul>

          <h6 className="mt-4">👤 User Management:</h6>
          <ul>
            <li>Profile Management - Name, age, gender, wing (A/B/C), flat number, mobile</li>
            <li>Event Registration - Submit entries for Dance, Singing, Rangoli, Skit, Drawing</li>
            <li>Team Management - Dynamic team member addition/removal (max 10 members)</li>
            <li>My Submissions - View, edit, delete personal submissions with timestamps</li>
          </ul>
        </div>
      </div>
    </div>
  )
}