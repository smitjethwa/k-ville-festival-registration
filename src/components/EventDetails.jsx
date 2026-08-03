import React from 'react'

export default function EventDetails() {
  const getActivityIcon = (name) => {
    switch (name) {
      case 'Speech': return '📢'
      case 'Play': return '🎭'
      case 'Singing': return '🎤'
      case 'Fancy Dress': return '👗'
      case 'Anchoring': return '🎙️'
      default: return '🎪'
    }
  }

  const events = [
    {
      name: 'Speech',
      description: 'Express your thoughts and inspire the audience with your speaking skills on relevant topics.',
      rules: ['Individual event', 'Time limit: 3-5 minutes', 'Content should be appropriate and original']
    },
    {
      name: 'Play',
      description: 'Bring characters to life on stage through skits, plays, or short drama performances.',
      rules: ['Team event (1-5 members)', 'Performance time: 5-10 minutes', 'Props are allowed']
    },
    {
      name: 'Singing',
      description: 'Showcase your vocal talents and musicality in solo or team performances.',
      rules: ['Solo or Team event (1-5 members)', 'Performance time: 3-5 minutes', 'Karaoke tracks or musical instruments allowed']
    },
    {
      name: 'Fancy Dress',
      description: 'Dress up as historic, patriotic, or creative characters and capture the essence of the theme.',
      rules: ['Individual event', 'Performance time: 1-2 minutes', 'A short intro or dialogue is encouraged']
    },
    {
      name: 'Anchoring',
      description: 'Guide the event forward with style, keeping the audience engaged and entertained.',
      rules: ['Individual or Dual event', 'Must be engaging, polite, and energetic', 'Scripts will be coordinated with the committee']
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
                <h5 className="card-title">{getActivityIcon(event.name)} {event.name}</h5>
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
      <br></br>
    </div>
  )
}