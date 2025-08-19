import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../AuthContext'
import FlatNumberInput from './FlatNumberInput'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  updateDoc
} from 'firebase/firestore'

const ACTIVITIES = ['Dance', 'Singing', 'Rangoli', 'Skit', 'Drawing', 'Fancy Dress', 'Business Hub']
const TEAM_ACTIVITIES = ['Dance', 'Singing', 'Skit', 'Fancy Dress', 'Business Hub']

export default function ActivityForm({ editDoc, onBack }) {
  const { user } = useAuth()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    flat_number: '',
    mobile_number: '',
    alternate_mobile: '',
    activity: 'Dance',
    title: '',
    team_name: '',
    stall_type: '',
    other_requirements: '',
    is_food_stall: '',
    members: [{ first_name: '', last_name: '', age: '', flat_number: '' }]
  })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!user) return
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        const u = snap.data()
        setForm(f => ({
          ...f,
          flat_number: u.flat_number || '',
          mobile_number: u.mobile_number || ''
        }))
      }
    }
    load()
  }, [user])

  useEffect(() => {
    if (editDoc) setForm(f => ({ ...f, ...editDoc }))
  }, [editDoc])

  const showTitle = ['Dance', 'Singing', 'Skit', 'Fancy Dress'].includes(form.activity)
  const isTeamActivity = TEAM_ACTIVITIES.includes(form.activity)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onFlatChange = (field, value) => {
    const parts = form.flat_number.split('-')
    const wing = field === 'wing' ? value : (parts[0] || '')
    const flatNum = field === 'flat_num' ? value : (parts[1] || '')
    setForm(prev => ({ ...prev, flat_number: `${wing}-${flatNum}` }))
  }

  const onMemberChange = (index, field, value) => {
    setForm(prev => {
      const members = [...prev.members]
      members[index][field] = value
      return { ...prev, members }
    })
  }

  const addMember = () => {
    if (form.members.length < 10) {
      setForm(prev => ({
        ...prev,
        members: [...prev.members, { name: '', age: '', flat_number: '' }]
      }))
    }
  }

  const removeMember = (index) => {
    if (form.members.length > 1) {
      setForm(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index)
      }))
    }
  }





  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMsg('')
    try {
      if (!user) throw new Error('Not signed in')
      
      // Validate flat number
      const wingPart = form.flat_number.split('-')[0]
      const flatPart = form.flat_number.split('-')[1]
      const validFlats = {
        A: ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401', '102', '202', '302', '402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402', '103', '203', '303', '403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403', '104', '204', '304', '404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404', '105', '205', '305', '405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405', '106', '206', '306', '406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406', '107', '207', '307', '407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407', '108', '208', '308', '408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408'],
        B: ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401', '102', '202', '302', '402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402', '103', '203', '303', '403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403', '104', '204', '304', '404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404', '105', '205', '305', '405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405', '106', '206', '306', '406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406', '107', '207', '307', '407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407', '108', '208', '308', '408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408', '109', '209', '309', '409', '509', '609', '709', '809', '909', '1009', '1109', '1209', '1309', '1409', '110', '210', '310', '410', '510', '610', '710', '810', '910', '1010', '1110', '1210', '1310', '1410'],
        C: ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401', '102', '202', '302', '402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402', '103', '203', '303', '403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403', '104', '204', '304', '404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404', '105', '205', '305', '405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405', '106', '206', '306', '406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406', '107', '207', '307', '407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407', '108', '208', '308', '408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408']
      }
      
      if (!validFlats[wingPart]?.includes(flatPart)) {
        throw new Error('Invalid flat number. Please select a valid flat number from the suggestions.')
      }




      const { wing, flat_num, ...cleanForm } = form
      const payload = {
        uid: cleanForm.uid || user.uid,
        activity: cleanForm.activity,
        title: showTitle ? cleanForm.title : '',
        name: `${cleanForm.first_name} ${cleanForm.last_name}`.trim(),
        first_name: cleanForm.first_name,
        last_name: cleanForm.last_name,
        age: cleanForm.age,
        gender: cleanForm.gender,
        flat_number: cleanForm.flat_number,
        mobile_number: cleanForm.mobile_number,
        team_name: isTeamActivity ? cleanForm.team_name : null,
        stall_type: cleanForm.activity === 'Business Hub' ? cleanForm.stall_type : null,
        other_requirements: cleanForm.activity === 'Business Hub' ? cleanForm.other_requirements : null,
        is_food_stall: cleanForm.activity === 'Business Hub' ? cleanForm.is_food_stall : null,
        members: isTeamActivity ? [
          { first_name: cleanForm.first_name, last_name: cleanForm.last_name, age: cleanForm.age, flat_number: cleanForm.flat_number },
          ...cleanForm.members.slice(1)
        ] : [],
        updated_at: serverTimestamp()
      }

      if (editDoc?.id) {
        const refDoc = doc(db, 'submissions', editDoc.id)
        await updateDoc(refDoc, payload)
        setMsg('Updated successfully ✅')
        setTimeout(() => setMsg(''), 5000)
      } else {
        await addDoc(collection(db, 'submissions'), {
          ...payload,
          created_at: serverTimestamp()
        })
        setMsg('Submitted successfully 🎉')
        setTimeout(() => setMsg(''), 5000)
        setForm(f => ({
          ...f,
          title: '',
          team_name: '',
          members: [{ name: '', age: '', flat_number: '' }]
        }))
      }
    } catch (err) {
      if (!err.message.includes('You already submitted')) {
        setError(err.message)
        setTimeout(() => setError(''), 5000)
      }
    }
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title mb-0">{editDoc ? 'Update ' : 'Register for the event'}</h2>
            {editDoc && (
              <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
                ← Back to List
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <h5 className="mb-3">Participant Details</h5>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  name="first_name"
                  value={form.first_name}
                  onChange={onChange}
                  placeholder="Enter first name"
                  maxLength={25}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Last Name (Optional)</label>
                <input
                  className="form-control"
                  name="last_name"
                  value={form.last_name}
                  onChange={onChange}
                  placeholder="Enter last name"
                  maxLength={25}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Age</label>
                <input
                  className="form-control"
                  name="age"
                  type="number"
                  min="1"
                  value={form.age}
                  onChange={onChange}
                  placeholder="Age"
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={form.gender}
                  onChange={onChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Activity</label>
              <select
                className="form-select"
                name="activity"
                value={form.activity}
                onChange={onChange}
              >
                {ACTIVITIES.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="row">
              {showTitle && (
                <div className="col-md-6 mb-3">
                  <label className="form-label">Song Name</label>
                  <input
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    maxLength={100}
                    required
                  />
                </div>
              )}
              {isTeamActivity && form.activity !== 'Business Hub' && (
                <div className="col-md-6 mb-3">
                  <label className="form-label">Team Name (Optional)</label>
                  <input
                    className="form-control"
                    name="team_name"
                    value={form.team_name}
                    onChange={onChange}
                    placeholder="Enter team name"
                    maxLength={25}
                  />
                </div>
              )}
              {form.activity === 'Business Hub' && (
                <>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Business Name (Optional)</label>
                    <input
                      className="form-control"
                      name="team_name"
                      value={form.team_name}
                      onChange={onChange}
                      placeholder="Enter business name"
                      maxLength={25}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Food Stall?</label>
                    <select
                      className="form-select"
                      name="is_food_stall"
                      value={form.is_food_stall}
                      onChange={onChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {form.activity === 'Business Hub' && (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Type of Stall</label>
                  <input
                    className="form-control"
                    name="stall_type"
                    value={form.stall_type}
                    onChange={onChange}
                    placeholder="Enter stall type"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Any Other Requirements</label>
                  <textarea
                    className="form-control"
                    name="other_requirements"
                    value={form.other_requirements}
                    onChange={onChange}
                    placeholder="Enter any special requirements"
                    rows="2"
                  />
                </div>
              </div>
            )}

            {isTeamActivity && (
              <>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Team Members ({form.members.length}/10)</h5>
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm btn-success me-2"
                      onClick={addMember}
                      disabled={form.members.length >= 10}
                    >
                      + Add Member
                    </button>
                  </div>
                </div>

                {form.members.map((m, i) => (
                  <div key={i} className="row mb-3 border p-3 rounded">
                    <div className="col-md-2">
                      <label className="form-label">{i === 0 ? 'First Name' : `Member ${i + 1} First Name`}</label>
                      <input
                        className="form-control"
                        value={i === 0 ? form.first_name : m.first_name}
                        onChange={(e) => i === 0 ? onChange({target: {name: 'first_name', value: e.target.value}}) : onMemberChange(i, 'first_name', e.target.value)}
                        placeholder="First name"
                        maxLength={25}
                        required
                        disabled={i === 0}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">{i === 0 ? 'Last Name' : `Last Name`}</label>
                      <input
                        className="form-control"
                        value={i === 0 ? form.last_name : m.last_name}
                        onChange={(e) => i === 0 ? onChange({target: {name: 'last_name', value: e.target.value}}) : onMemberChange(i, 'last_name', e.target.value)}
                        placeholder="Last name"
                        maxLength={25}
                        disabled={i === 0}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Age</label>
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        value={i === 0 ? form.age : (m.age || '')}
                        onChange={(e) => i === 0 ? onChange({target: {name: 'age', value: e.target.value}}) : onMemberChange(i, 'age', e.target.value)}
                        required
                        disabled={i === 0}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Wing</label>
                      <select
                        className="form-select"
                        value={i === 0 ? form.flat_number.split('-')[0] || '' : ((m.flat_number || '').split('-')[0] || '')}
                        onChange={(e) => {
                          if (i === 0) {
                            onFlatChange('wing', e.target.value)
                          } else {
                            const parts = (m.flat_number || '').split('-')
                            const newFlat = `${e.target.value}-${parts[1] || ''}`
                            onMemberChange(i, 'flat_number', newFlat)
                          }
                        }}
                        disabled={i === 0}
                        required
                      >
                        <option value="">Select</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Flat #</label>
                      <input
                        className="form-control"
                        value={i === 0 ? form.flat_number.split('-')[1] || '' : ((m.flat_number || '').split('-')[1] || '')}
                        onChange={(e) => {
                          if (i === 0) {
                            onFlatChange('flat_num', e.target.value)
                          } else {
                            const parts = (m.flat_number || '').split('-')
                            const newFlat = `${parts[0] || ''}-${e.target.value}`
                            onMemberChange(i, 'flat_number', newFlat)
                          }
                        }}
                        disabled={i === 0}
                        required
                      />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => removeMember(i)}
                        disabled={form.members.length <= 1 || i === 0}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            <hr className="my-4" />
            <h6 className="mb-3">Contact Details (From Profile)</h6>
            <div className="row">
              <div className="col-md-4 mb-3">
                <FlatNumberInput
                  wing={form.flat_number.split('-')[0] || ''}
                  flatNum={form.flat_number.split('-')[1] || ''}
                  onWingChange={(value) => onFlatChange('wing', value)}
                  onFlatChange={(value) => onFlatChange('flat_num', value)}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Mobile Number</label>
                <input 
                  className="form-control" 
                  name="mobile_number"
                  type="tel"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={form.mobile_number} 
                  onChange={onChange}
                  placeholder="Enter 10-digit mobile number"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Alternate Mobile (Optional)</label>
                <input 
                  className="form-control" 
                  name="alternate_mobile"
                  type="tel"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={form.alternate_mobile} 
                  onChange={onChange}
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-danger">
                ⚠ {error}
              </div>
            )}
            {msg && <div className="alert alert-success">✅ {msg}</div>}
            <div className="mt-3">
              <button className="btn btn-primary" type="submit">
                {editDoc ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
