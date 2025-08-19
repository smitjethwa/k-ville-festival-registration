import React from 'react'

export default function EventDetails() {
  const events = [
    {
      name: 'Dance',
      description: 'Showcase your dancing skills with your team',
      rules: ['Team event (1-10 members)', 'Performance time: 3-5 minutes', 'Please provide the audio separately to Coordinator']
    },
    {
      name: 'Singing',
      description: 'Solo or group singing performance',
      rules: ['Team event (1-10 members)', 'Performance time: 3-5 minutes', 'Accompaniment allowed']
    },
    {
      name: 'Rangoli',
      description: 'Traditional floor art competition',
      rules: ['Individual event', 'Time limit: 2 hours']
    },
    {
      name: 'Skit',
      description: 'Drama and theatrical performance',
      rules: ['Team event (1-10 members)', 'Performance time: 15-20 minutes', 'Props allowed']
    },
    {
      name: 'Drawing',
      description: 'Art and creativity competition',
      rules: ['Individual event', 'Time limit: 2 hours','Bring the necessary materials','A3 Size paper would be provided']
    },
    {
      name: 'Fancy Dress',
      description: 'Showcase your creativity by dressing up in unique costumes and portraying a character',
      rules: ['Individual/Dual event', 'Performance time: 1-2 minutes', 'Participants must bring their own costume and props',
              'Short introduction or dialogue related to the character is encouraged']
    }
  ]

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title"><span className="material-icons">event</span> Event Details</h1>
          <p className="text-muted">Complete information about all events</p>
        </div>
      </div>

      <div className="row mt-4">
        {events.map((event, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                
                <h6 className="mt-3">Rules & Guidelines:</h6>
                <ul className="list-unstyled">
                  {event.rules.map((rule, i) => (
                    <li key={i} className="mb-1">• {rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}