import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
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
    setSubmissions(submissionList)
    setFilteredSubmissions(submissionList)
  }

  const getActivityBadgeClass = (activity) => {
    const classes = {
      'Dance': 'bg-danger',
      'Singing': 'bg-success', 
      'Rangoli': 'bg-warning text-dark',
      'Skit': 'bg-info',
      'Drawing': 'bg-secondary',
      'Fancy Dress': 'bg-primary',
      'Business Hub': 'bg-dark'
    }
    return classes[activity] || 'bg-primary'
  }

  const handleActivityFilter = (activity) => {
    setActivityFilter(activity)
    if (activity === 'All') {
      setFilteredSubmissions(submissions)
    } else {
      setFilteredSubmissions(submissions.filter(sub => sub.activity === activity))
    }
  }

  useEffect(() => {
    handleActivityFilter(activityFilter)
  }, [submissions])

  const exportToExcel = () => {
    const exportData = filteredSubmissions.map((sub, index) => ({
      'Sr. No.': index + 1,
      'Activity': sub.activity,
      'Participant Name': sub.name || `${sub.first_name || ''} ${sub.last_name || ''}`.trim(),
      'Age': sub.age,
      'Gender': sub.gender,
      'Flat': sub.flat_number,
      'Mobile': sub.mobile_number,
      'Team Name': sub.team_name || 'N/A',
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
                  <option value="Rangoli">Rangoli</option>
                  <option value="Skit">Skit</option>
                  <option value="Drawing">Drawing</option>
                  <option value="Fancy Dress">Fancy Dress</option>
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
                      <th>Participant Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Flat</th>
                      <th>Mobile</th>
                      <th>Team Name</th>
                      <th>Team Members</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((sub, index) => (
                      <tr key={sub.id}>
                        <td>{index + 1}</td>
                        <td><span className={`badge ${getActivityBadgeClass(sub.activity)}`}>{sub.activity}</span></td>
                        <td>{sub.name || `${sub.first_name || ''} ${sub.last_name || ''}`.trim()}</td>
                        <td>{sub.age}</td>
                        <td>{sub.gender}</td>
                        <td>{sub.flat_number}</td>
                        <td>{sub.mobile_number}</td>
                        <td>{sub.team_name || 'N/A'}</td>
                        <td>
                          {sub.members?.length > 0 ? (
                            <small>{sub.members.map(m => `${m.first_name || m.name || ''} ${m.last_name || ''}`.trim() + (m.age ? ` (${m.age})` : '')).join(', ')}</small>
                          ) : 'N/A'}
                        </td>
                        <td>{sub.created_at?.toDate?.()?.toLocaleDateString() || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}