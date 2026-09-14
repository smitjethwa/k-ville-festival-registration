import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, doc, getDoc, deleteDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../AuthContext'
import * as XLSX from 'xlsx'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [filteredSubmissions, setFilteredSubmissions] = useState([])
  const [activeTab, setActiveTab] = useState('submissions')
  const [activityFilter, setActivityFilter] = useState('All')
  const [isSuperuser, setIsSuperuser] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ show: false, submissionId: null, participantName: '' })
  const [registrationStatus, setRegistrationStatus] = useState({})

  const ACTIVITIES = ['Dance', 'Singing', 'Fashion Show/Fancy Dress', 'Skit', 'Business Hub']

  const ACTIVITY_ICONS = {
    'Dance': '💃',
    'Singing': '🎤',
    'Fashion Show/Fancy Dress': '👗',
    'Skit': '🎭',
    'Business Hub': '🛍️'
  }

  useEffect(() => {
    checkSuperuser()
    loadUsers()
    loadSubmissions()
  }, [user])

  // Subscribe to registration status in real time
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'registrations'), (snap) => {
      if (snap.exists()) {
        setRegistrationStatus(snap.data())
      } else {
        setRegistrationStatus({})
      }
    })
    return () => unsub()
  }, [])

  const checkSuperuser = async () => {
    if (!user) return
    const adminDoc = await getDoc(doc(db, 'admins', user.uid))
    if (adminDoc.exists()) {
      const adminData = adminDoc.data()
      setIsSuperuser(adminData.role === 'superuser')
    }
  }

  const loadUsers = async () => {
    const snap = await getDocs(collection(db, 'users'))
    const userList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setUsers(userList)
  }

  const loadSubmissions = async () => {
    const snap = await getDocs(collection(db, 'submissions'))
    const submissionList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        const nameA = (a.name || `${a.first_name || ''} ${a.last_name || ''}`.trim()).toLowerCase()
        const nameB = (b.name || `${b.first_name || ''} ${b.last_name || ''}`.trim()).toLowerCase()
        return nameA.localeCompare(nameB)
      })
    setSubmissions(submissionList)
    setFilteredSubmissions(submissionList)
  }

  const getActivityBadgeClass = (activity) => {
    const classes = {
      'Dance': 'bg-danger',
      'Singing': 'bg-success',
      'Fashion Show/Fancy Dress': 'bg-primary',
      'Skit': 'bg-info',
      'Business Hub': 'bg-dark'
    }
    return classes[activity] || 'bg-primary'
  }

  const handleActivityFilter = (activity) => {
    setActivityFilter(activity)
    let filtered = activity === 'All' ? submissions : submissions.filter(sub => sub.activity === activity)
    filtered = filtered.sort((a, b) => {
      const nameA = (a.name || `${a.first_name || ''} ${a.last_name || ''}`.trim()).toLowerCase()
      const nameB = (b.name || `${b.first_name || ''} ${b.last_name || ''}`.trim()).toLowerCase()
      return nameA.localeCompare(nameB)
    })
    setFilteredSubmissions(filtered)
  }

  const showDeleteModal = (submissionId, participantName) => {
    setDeleteModal({ show: true, submissionId, participantName })
  }

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'submissions', deleteModal.submissionId))
      setDeleteModal({ show: false, submissionId: null, participantName: '' })
      loadSubmissions()
    } catch (error) {
      alert('Error deleting submission: ' + error.message)
    }
  }

  useEffect(() => {
    handleActivityFilter(activityFilter)
  }, [submissions])

  const toggleRegistration = async (activity) => {
    const current = registrationStatus[activity] !== false // default open
    const updated = { ...registrationStatus, [activity]: !current }
    await setDoc(doc(db, 'settings', 'registrations'), updated)
  }

  const exportToExcel = () => {
    const exportData = filteredSubmissions.map((sub, index) => ({
      'Sr. No.': index + 1,
      'Activity': sub.activity,
      'Type': sub.participation_type || (sub.members?.length > 1 ? 'group' : 'solo'),
      'Participant Name': sub.name || `${sub.first_name || ''} ${sub.last_name || ''}`.trim(),
      'Age': sub.age,
      'Gender': sub.gender,
      'Flat': sub.flat_number,
      'Mobile': sub.mobile_number,
      'Team Name': sub.team_name || 'N/A',
      'Member Count': sub.members?.length || 1,
      'Team Members': sub.members?.map(m => `${m.first_name || m.name || ''} ${m.last_name || ''}`.trim() + (m.age ? ` (${m.age})` : '')).join(', ') || 'N/A',
      'Created': sub.created_at?.toDate?.()?.toLocaleDateString() || 'N/A'
    }))
    
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Submissions')
    XLSX.writeFile(wb, 'festival_submissions.xlsx')
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="card-title mb-0"><span className="material-icons">dashboard</span> Admin Dashboard</h2>
            {activeTab === 'submissions' && (
              <div>
                <select 
                  className="form-select me-2" 
                  style={{width: '200px', display: 'inline-block'}}
                  value={activityFilter} 
                  onChange={(e) => handleActivityFilter(e.target.value)}
                >
                  <option value="All">All Activities</option>
                  <option value="Dance">Dance</option>
                  <option value="Singing">Singing</option>
                  <option value="Fashion Show/Fancy Dress">Fashion Show/Fancy Dress</option>
                  <option value="Skit">Skit</option>
                  <option value="Business Hub">Business Hub</option>
                </select>
                <button className="btn btn-success" onClick={exportToExcel}>
                  <span className="material-icons">download</span> Export Excel
                </button>
              </div>
            )}
          </div>
          
          <ul className="nav nav-tabs mt-4">
            {isSuperuser && (
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                  onClick={() => setActiveTab('users')}
                >
                  Users ({users.length})
                </button>
              </li>
            )}
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'submissions' ? 'active' : ''}`}
                onClick={() => setActiveTab('submissions')}
              >
                Submissions ({filteredSubmissions.length})
              </button>
            </li>
            {isSuperuser && (
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'registrations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('registrations')}
                >
                  🔐 Registration Control
                </button>
              </li>
            )}
          </ul>

          <div className="tab-content mt-4">
            {activeTab === 'users' && isSuperuser && (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Flat Number</th>
                      <th>Mobile</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td><code>{user.id}</code></td>
                        <td>{user.name || 'N/A'}</td>
                        <td>{user.email || 'N/A'}</td>
                        <td>{user.flat_number || 'N/A'}</td>
                        <td>{user.mobile_number || 'N/A'}</td>
                        <td>{user.created_at?.toDate?.()?.toLocaleDateString() || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Sr.</th>
                      <th>Activity</th>
                      <th>Type</th>
                      <th>Participant Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Flat</th>
                      <th>Mobile</th>
                      <th>Team Name</th>
                      <th>Members</th>
                      <th>Created</th>
                      {isSuperuser && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((sub, index) => (
                      <tr key={sub.id}>
                        <td>{index + 1}</td>
                        <td><span className={`badge ${getActivityBadgeClass(sub.activity)}`}>{sub.activity}</span></td>
                        <td><span className="badge bg-light text-dark border">{sub.participation_type || (sub.members?.length > 1 ? 'group' : 'solo')}</span></td>
                        <td>{sub.name || `${sub.first_name || ''} ${sub.last_name || ''}`.trim()}</td>
                        <td>{sub.age}</td>
                        <td>{sub.gender}</td>
                        <td>{sub.flat_number}</td>
                        <td>{sub.mobile_number}</td>
                        <td>{sub.team_name || 'N/A'}</td>
                        <td>
                          {sub.members?.length > 0 ? (
                            <small>
                              <span className="badge bg-secondary me-1">{sub.members.length}</span>
                              {sub.members.map(m => `${m.first_name || m.name || ''} ${m.last_name || ''}`.trim() + (m.age ? ` (${m.age})` : '')).join(', ')}
                            </small>
                          ) : <span className="text-muted">Solo</span>}
                        </td>
                        <td>{sub.created_at?.toDate?.()?.toLocaleDateString() || 'N/A'}</td>
                        {isSuperuser && (
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => showDeleteModal(sub.id, sub.name || `${sub.first_name || ''} ${sub.last_name || ''}`.trim())}
                              title="Delete submission"
                            >
                              <span className="material-icons" style={{fontSize: '16px'}}>delete</span>
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

            {/* Registration Control Tab */}
            {activeTab === 'registrations' && isSuperuser && (
              <div className="mt-2">
                <div className="alert alert-info mb-4 d-flex align-items-center gap-2" style={{fontSize: '0.95rem'}}>
                  <span className="material-icons" style={{fontSize: '20px'}}>info</span>
                  <span>Toggle registrations open or closed for each event. Changes take effect immediately for all users.</span>
                </div>
                <div className="row g-3">
                  {ACTIVITIES.map(activity => {
                    const isOpen = registrationStatus[activity] !== false
                    return (
                      <div className="col-md-6 col-lg-4" key={activity}>
                        <div
                          className="card h-100"
                          style={{
                            border: `2px solid ${isOpen ? '#198754' : '#dc3545'}`,
                            borderRadius: '12px',
                            transition: 'border-color 0.3s'
                          }}
                        >
                          <div
                            className="card-header d-flex align-items-center gap-2 text-white"
                            style={{
                              background: isOpen
                                ? 'linear-gradient(135deg, #198754, #146c43)'
                                : 'linear-gradient(135deg, #dc3545, #b02a37)',
                              borderRadius: '10px 10px 0 0',
                              transition: 'background 0.3s'
                            }}
                          >
                            <span style={{fontSize: '1.4rem'}}>{ACTIVITY_ICONS[activity]}</span>
                            <span className="fw-semibold" style={{fontSize: '1rem'}}>{activity}</span>
                            <span
                              className="ms-auto badge"
                              style={{background: 'rgba(255,255,255,0.25)', fontSize: '0.8rem'}}
                            >
                              {isOpen ? '🟢 Open' : '🔴 Closed'}
                            </span>
                          </div>
                          <div className="card-body d-flex flex-column align-items-center justify-content-center py-4">
                            <p className="text-muted mb-3" style={{fontSize: '0.9rem', textAlign: 'center'}}>
                              Registrations are currently{' '}
                              <strong style={{color: isOpen ? '#198754' : '#dc3545'}}>
                                {isOpen ? 'open' : 'closed'}
                              </strong>{' '}for this event.
                            </p>
                            <button
                              className={`btn ${isOpen ? 'btn-outline-danger' : 'btn-outline-success'} fw-semibold`}
                              style={{minWidth: '180px', borderRadius: '8px'}}
                              onClick={() => toggleRegistration(activity)}
                            >
                              {isOpen
                                ? <><span className="material-icons" style={{fontSize:'16px', verticalAlign:'middle', marginRight:'4px'}}>lock</span>Close Registrations</>
                                : <><span className="material-icons" style={{fontSize:'16px', verticalAlign:'middle', marginRight:'4px'}}>lock_open</span>Open Registrations</>
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the submission for <strong>{deleteModal.participantName}</strong>?</p>
                <p className="text-muted">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setDeleteModal({ show: false, submissionId: null, participantName: '' })}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}