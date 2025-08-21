import React from 'react'

export default function ContactUs() {
  const contacts = [
    {
      team: 'Event Coordinator',
      name: 'Bhagyashree Tipare',
      mobile: '+91 7058899285'
    },
    {
      team: 'Event Coordinator',
      name: 'Zarin',
      mobile: '+91 9172429212'
    },
    {
      team: 'Team',
      name: 'Nikhil Patil',
      mobile: '+91 8850121563'
    },
    {
      team: 'Team',
      name: 'Pooja Bidve',
      mobile: '+91 9921608990'
    },
    {
      team: 'Team',
      name: 'Prasad Pingale',
      mobile: '+91 9225216121',
    },
    {
      team: 'Team',
      name: 'Rucha Kulkarni',
      mobile: '+91 9503584169',
    },
    {
      team: 'Team',
      name: 'Shubhada Thite',
      mobile: '+91 9923408093',
    },
    {
      team: 'Team',
      name: 'Nikhil Tipore',
      mobile: '+91 9595554425',
    },
    {
      team: 'Team',
      name: 'Swapnil Kulkarni',
      mobile: '+91 9405475704'
    },
    {
      team: 'Technical Support',
      name: 'Smit Jethwa',
      mobile: '+91 8767973888'
    },
    {
      team: 'Team',
      name: 'Rupali Patil',
      mobile: '+91 8805011639'
    },
    {
      team: 'Team',
      name: 'Mit Jethwa',
      mobile: '+91 8080073888'
    },
    {
      team: 'Team',
      name: 'Neha Dhanve',
      mobile: '+91 9370163713'
    },
    {
      team: 'Team',
      name: 'Jagriti Patil',
      mobile: '+91 9168991599'
    },
    {
      team: 'Team',
      name: 'Rajani Pendhare',
      mobile: '+91 8830247160'
    }
  ]

  // Group contacts by team
  const groupedContacts = contacts.reduce((groups, contact) => {
    const team = contact.team
    if (!groups[team]) {
      groups[team] = []
    }
    groups[team].push(contact)
    return groups
  }, {})

  return (
    <div className="container mt-4 mb-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title"><span className="material-icons">contact_phone</span> Contact Us</h1>
          <p className="text-muted">Get in touch with our team for any queries or assistance</p>
        </div>
      </div>

      {Object.entries(groupedContacts).map(([team, members]) => (
        <div key={team} className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary mb-3">
                  <span className="material-icons me-2">
                    {team === 'Technical Support' ? 'support' :
                      team === 'Event Coordinator' ? 'event' : 'help'}
                  </span>
                  {team}
                </h5>

                <div className="row g-3">
                  {members.sort((a, b) => a.name.localeCompare(b.name)).map((contact, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                      <div className="border rounded p-3">
                        <h6 className="mb-1">{contact.name}</h6>
                        <p className="mb-0">
                          <a href={`tel:${contact.mobile}`} className="text-decoration-none">
                            <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>phone</span>
                            {contact.mobile}
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}