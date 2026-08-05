import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { useAuth } from '../AuthContext'
import * as XLSX from 'xlsx'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [filteredSubmissions, setFilteredSubmissions] = useState([])
  const [activeTab, setActiveTab] = useState('submissions')
  const [activityFilter, setActivityFilter] = useState('BusinessHub')
  const [isSuperuser, setIsSuperuser] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ show: false, submissionId: null, participantName: '' })

  useEffect(() => {
    checkSuperuser()
    loadUsers()
    loadSubmissions()
  }, [user])

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
      'Speech': 'bg-primary',
      'Play': 'bg-danger',
      'Singing': 'bg-success',
      'Fancy Dress': 'bg-warning text-dark',
      'Anchoring': 'bg-info text-dark',
      'Dance': 'bg-dark'
    }
    return classes[activity] || 'bg-primary'
  }

  const handleActivityFilter = (activity) => {
    setActivityFilter(activity)
    let filtered = submissions
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

  const exportToExcel = () => {
    const exportData = filteredSubmissions.map((sub, index) => ({
      'activity': sub.activity,
      'age': sub.age,
      'created_at': sub.created_at?.toDate?.()?.toLocaleDateString() || 'N/A',
      'flat_number': sub.flat_number || 'N/A',
      'gender': sub.gender,
      'is_food_stall': sub.is_food_stall || 'N/A',
      'mobile_number': sub.mobile_number,
      'name': sub.name || `${sub.first_name || ''} ${sub.last_name || ''}`.trim(),
      'alternate_mobile': sub.alternate_mobile || 'N/A',
      'language': sub.language || 'N/A',
      'other_requirements': sub.other_requirements || 'N/A',
      'stall_type': sub.stall_type || 'N/A',
      'table_count': sub.table_count || 'N/A',
      'team_name': sub.team_name || 'N/A',
      'transaction_id': sub.transaction_id || 'N/A',
      'updated_at': sub.updated_at?.toDate?.()?.toLocaleDateString() || 'N/A'
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
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <h2 className="card-title mb-2 mb-md-0"><span className="material-icons">dashboard</span> Admin Dashboard</h2>
            {activeTab === 'submissions' && (
              <div className="d-flex flex-column flex-sm-row gap-2">

                <button className="btn btn-success" onClick={exportToExcel}>
                  <span className="material-icons">download</span> <span className="d-none d-sm-inline">Export Excel</span>
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
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Wing</th>
                      <th>Flat Number</th>
                      <th>Mobile</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td><code style={{fontSize: '12px'}}>{user.id}</code></td>
                        <td>{user.name || 'N/A'}</td>
                        <td><small>{user.email || 'N/A'}</small></td>
                        <td>{user.age || 'N/A'}</td>
                        <td><small>{user.gender || 'N/A'}</small></td>
                        <td><small>{user.wing || 'N/A'}</small></td>
                        <td><small>{user.flat_number || 'N/A'}</small></td>
                        <td><small>{user.mobile_number || 'N/A'}</small></td>
                        <td><small>{user.created_at?.toDate?.()?.toLocaleDateString() || 'N/A'}</small></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="row">
                {filteredSubmissions.map((sub, index) => (
                  <div key={sub.id} className="col-12 col-md-6 col-lg-4 mb-3">
                    <div className="card h-100">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <span className="fw-bold">#{index + 1}</span>
                        <span className={`badge ${getActivityBadgeClass(sub.activity)} text-wrap`} style={{fontSize: '0.7rem'}}>
                          {sub.activity}
                        </span>
                      </div>
                      <div className="card-body">
                        <h6 className="card-title">{sub.name || `${sub.first_name || ''} ${sub.last_name || ''}`.trim()}</h6>
                        <div className="row small">
                          <div className="col-6"><strong>Age:</strong> {sub.age}</div>
                          <div className="col-6"><strong>Gender:</strong> {sub.gender}</div>
                        </div>
                        <hr className="my-2"/>
                        <div className="mb-2 small">
                          <strong>Flat:</strong> {sub.flat_number || 'N/A'}
                        </div>
                        <div className="mb-2 small">
                          <strong>Mobile:</strong> {sub.mobile_number}<br/>
                          {sub.title && <><strong>Title:</strong> {sub.title}<br/></>}
                          {sub.topic && <><strong>Topic:</strong> {sub.topic}<br/></>}
                          {sub.language && <><strong>Language:</strong> {sub.language}<br/></>}
                          <strong>Team Name:</strong> {sub.team_name || 'N/A'}
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">
                            Created: {sub.created_at?.toDate?.()?.toLocaleDateString() || 'N/A'}
                          </small>
                          {isSuperuser && (
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => showDeleteModal(sub.id, sub.name || `${sub.first_name || ''} ${sub.last_name || ''}`.trim())}
                              title="Delete submission"
                            >
                              <span className="material-icons" style={{fontSize: '14px'}}>delete</span>
                            </button>
                          )}
                        </div>
                        <small className="text-muted">
                          ID: <code style={{fontSize: '10px'}}>{sub.id}</code>
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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