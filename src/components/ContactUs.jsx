import React from 'react'

export default function ContactUs() {
  const contacts = [
    {
      team: 'Wing-wise Coordinator',
      name: '(A-wing) Akshay Mamidwar',
      mobile: '+91  9172484440'
    },
    {
      team: 'Wing-wise Coordinator',
      name: '(B-wing) Shubhada Thite',
      mobile: '+91 9923408093'
    },
    {
      team: 'Wing-wise Coordinator',
      name: '(C-wing) Prasad Pingale',
      mobile: '+91 9225216121'
    },
    {
      team: 'Team',
      name: 'Aishwarya Gabhane',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Ajit Pendhare',
      mobile: '',
    },
    {
      team: 'Team',
      name: 'Rucha Kulkarni',
      mobile: '',
    },
    {
      team: 'Team',
      name: 'Anu Sachdeva',
      mobile: '',
    },
    {
      team: 'Team',
      name: 'Jagriti Patil',
      mobile: '',
    },
    {
      team: 'Team',
      name: 'Swapnil Kulkarni',
      mobile: ''
    },
    {
      team: 'Webmaster',
      name: 'Smit Jethwa',
      mobile: '+91 8767973888'
    },
    {
      team: 'Team',
      name: 'Rupali Patil',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Mit Jethwa',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Nikhil Patil',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Rajani Pendhare',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Pooja Bidve',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Sarika Kadam',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Snehal Pingle',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Swapnil Mote',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Tithi Agarwal',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Vrushali Ghate',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Leena Bendale',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Priyanka Dumane',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Deepali Sonar',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Gayatri Chaudhari',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Komal Sheti',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Samudyatha Tanedkar',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Sarika Pandit',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Shrilaxmi',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Shubhangi',
      mobile: ''
    },
    {
      team: 'Team',
      name: 'Sneha Gawande',
      mobile: ''
    }, 
    {
      team: 'Team',
      name: 'Swati Srivastava',
      mobile: ''
    }, 
    {
      team: 'Team',
      name: 'Veena',
      mobile: ''
    }, 
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
                    {team === 'Webmaster' ? 'support' :
                      team === 'Wing-wise Coordinator' ? 'event' : 'help'}
                  </span>
                  {team}
                </h5>

                <div className="row g-3">
                  {members.sort((a, b) => a.name.localeCompare(b.name)).map((contact, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                      <div className="border rounded p-3">
                        <h6 className="mb-1">{contact.name}</h6>
                        {contact.mobile && (
                          <p className="mb-0">
                            <a href={`tel:${contact.mobile}`} className="text-decoration-none">
                              <span className="material-icons me-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>phone</span>
                              {contact.mobile}
                            </a>
                          </p>
                        )}
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