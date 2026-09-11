import React from 'react'

export default function EventDetails() {
  const getActivityIcon = (name) => {
    switch(name) {
      case 'Dance': return '🕺'
      case 'Singing': return '🎤'
      case 'Fashion Show/Fancy Dress': return '👗'
      case 'Skit': return '🎭'
      case 'Business Hub': return '🏪'
      default: return '🎪'
    }
  }

  const events = [
    {
      name: 'Dance',
      description: 'Showcase your dancing skills — solo or as a group performance!',
      rules: [
        'Solo or Group event (1–10 members)',
        'Performance time: 3–5 minutes',
        'Please provide the audio separately to the Coordinator'
      ]
    },
    {
      name: 'Singing',
      description: 'Solo or group singing performance to entertain the audience.',
      rules: [
        'Solo or Group event (1–10 members)',
        'Performance time: 3–5 minutes',
        'Accompaniment allowed'
      ]
    },
    {
      name: 'Fashion Show/Fancy Dress',
      description: 'Showcase your creativity by dressing up in unique costumes and portraying a character.',
      rules: [
        'Solo or Group event (1–10 members)',
        'Performance time: 1–3 minutes per participant',
        'Participants must bring their own costume and props',
        'Short introduction or dialogue related to the character is encouraged'
      ]
    },
    {
      name: 'Skit',
      description: 'Drama and theatrical group performance on stage.',
      rules: [
        'Group event (2–10 members)',
        'Performance time: 10–15 minutes',
        'Props allowed'
      ]
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
                
                <h6 className="mt-3">Rules &amp; Guidelines:</h6>
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

      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">🏪 Business Hub</h2>
              <p className="text-muted">Food stalls and business opportunities for the festival</p>
              <h6 className="card-title">1. General Guidelines:</h6>
              <ul>
                <li>Stall owners must bring all necessary supplies and materials for their stalls.</li>
                <li>The festival committee will not charge any participation fee and will not take any share of the sales.</li>
                <li>The committee will not cover any expenses or provide materials, especially last-minute supplies.</li>
                <li>Large waste bins will be provided, but participants are responsible for managing their own waste disposal.</li>
                <li>Maintaining hygiene is a top priority. Should clean that space.</li>
              </ul>
              <h6 className="card-title">2. Food Stall Rules:</h6>
              <ul>
                <li>The use of open fire is strictly prohibited within and around food stalls. No exceptions will be made.</li>
                <li>Non-vegetarian food is not allowed.</li>
                <li>Due to limited space, spot entries will not be accepted. Please plan your sales in advance, and consider using a coupon system if needed.</li>
                <li>Manage your own waste and avoid food wastage.</li>
                <li>If generating a large amount of dry waste, bring your own dustbins.</li>
              </ul>
              <h6 className="card-title">3. Table Information:</h6>
              <ul>
                <li>Tables will be arranged based on the final number of participants.</li>
                <li>The table fee will be communicated 4 days before the event.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}