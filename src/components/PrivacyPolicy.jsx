import React, { useEffect } from 'react'

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy - K-Ville Festivals'
  }, [])

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">
            <span className="material-icons">privacy_tip</span> Privacy Policy
          </h1>
          
          <p className="text-muted">Last updated: August 2025</p>
          
          <h4>Data Collection</h4>
          <p>We collect the following information when you register for events:</p>
          <ul>
            <li>Name, age, and gender</li>
            <li>Flat number and wing details</li>
            <li>Mobile number</li>
            <li>Google account information (email)</li>
            We only use your Google email address for authentication and event communication. We do not access other Google account data
            <li>Event registration details and team member information</li>
          </ul>

          <h4>Data Usage</h4>
          <p>Your personal information is used for:</p>
          <ul>
            <li>Event registration and management</li>
            <li>Contacting participants about event updates</li>
            <li>Organizing competitions and activities</li>
            <li>Emergency contact purposes during events</li>
          </ul>

          <h4>Data Sharing</h4>
          <p><strong>We do NOT share your personal data with anyone, including sponsors or third parties.</strong></p>
          <p>Your information remains strictly within the K-Ville Society Phase III and IV festival management system.</p>

          <h4>Data Security</h4>
          <p>We implement appropriate security measures to protect your personal information:</p>
          <ul>
            <li>Secure Firebase authentication</li>
            <li>Access restricted to authorized festival organizers only</li>
          </ul>

          <h4>Your Rights</h4>
          <p>You have the right to:</p>
          <ul>
            <li>View and edit your personal information</li>
            <li>Delete your event registrations</li>
            <li>Request removal of your data</li>
          </ul>

          <h4>Contact Us</h4>
          <p>For any privacy-related questions or concerns, please contact the festival committee through the Contact Us page.</p>

          {/* <hr /> */}
          {/* <p className="text-muted small"> */}
            {/* This privacy policy applies to the K-Ville Festivals event registration system and is subject to change with notice. */}
          {/* </p> */}
        </div>
      </div>
        <br></br>
    </div>
  )
}