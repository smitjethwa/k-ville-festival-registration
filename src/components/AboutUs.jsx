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
          <p style={{textAlign: 'justify'}}>
            Welcome to the Festival Committee of K-Ville Phase III and IV!
            We are a group of enthusiastic residents who come together to plan, organize, and celebrate festivals and cultural events in our society.

            Our mission is simple - to create moments of joy, togetherness, and cultural harmony for all age groups. From traditional celebrations and festive decorations to fun activities, competitions, and community gatherings, we aim to make every occasion special.

            The committee works with the spirit of unity, creativity, and volunteerism, ensuring that each event reflects our society's vibrant culture and diversity.
          </p>
          <p>
            Our modern web application streamlines the registration process for society festival events,
            making it easy for residents to participate in cultural activities and competitions.
          </p>

          <h6 className="mt-4">✨ What We Do</h6>
          <ul>
            <li>Organize and manage festival celebrations</li>
            <li>Encourage resident participation and talent</li>
            <li>Build stronger community bonds through cultural events</li>
            <li>Ensure inclusive celebrations for all age groups</li>

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