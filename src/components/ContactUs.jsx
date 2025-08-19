import React from 'react'

export default function ContactUs() {
  const contacts = [
    {
      name: 'Event Coordinator',
      person: 'Rajesh Kumar',
      mobile: '+91 98765 43210',
      email: 'events@kville.com'
    },
    {
      name: 'Registration Help',
      person: 'Priya Sharma',
      mobile: '+91 87654 32109',
      email: 'registration@kville.com'
    },
    {
      name: 'Technical Support',
      person: 'Amit Patel',
      mobile: '+91 76543 21098',
      email: 'support@kville.com'
    }
  ]

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title"><span className="material-icons">contact_phone</span> Contact Us</h1>
          <p className="text-muted">Get in touch with our team for any queries or assistance</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Contact Information</h5>
              
              {contacts.map((contact, index) => (
                <div key={index} className="border-bottom pb-3 mb-3">
                  <h6 className="text-primary">{contact.name}</h6>
                  <p className="mb-1"><strong>Contact Person:</strong> {contact.person}</p>
                  <p className="mb-1"><strong>Mobile:</strong> <a href={`tel:${contact.mobile}`}>{contact.mobile}</a></p>
                  <p className="mb-0"><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}