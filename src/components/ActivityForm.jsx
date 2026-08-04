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

const ACTIVITIES = ['Speech', 'Play', 'Singing', 'Fancy Dress', 'Anchoring']
const TEAM_ACTIVITIES = ['Play', 'Singing']

export default function ActivityForm({ editDoc, onBack }) {
  const { user } = useAuth()
  const [isSuperuser, setIsSuperuser] = useState(false)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    flat_number: '',
    mobile_number: '',
    alternate_mobile: '',
    activity: '',
    title: '',
    topic: '',
    team_name: '',
    stall_type: '',
    other_requirements: '',
    is_food_stall: '',
    table_count: '0',
    transaction_id: '',
    language: '',
    members: [{ first_name: '', last_name: '', age: '', flat_number: '' }]
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!user) return
      
      // Check if user is superuser
      try {
        const superuserSnap = await getDoc(doc(db, 'superusers', user.uid))
        setIsSuperuser(superuserSnap.exists())
      } catch (error) {
        setIsSuperuser(false)
      }
      
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
    if (editDoc) {
      const mappedDoc = { ...editDoc }
      if (mappedDoc.age) {
        if (mappedDoc.age === '3 to 5') mappedDoc.age = '3 to 5 Years'
        else if (mappedDoc.age === '5 to 8') mappedDoc.age = '5 to 8 Years'
        else if (mappedDoc.age === '8 to 12') mappedDoc.age = '8 to 12 Years'
        else if (mappedDoc.age === '12 +') {
          mappedDoc.age = mappedDoc.activity === 'Anchoring' ? '' : '12+ Years'
        }
      }
      if (Array.isArray(mappedDoc.members)) {
        mappedDoc.members = mappedDoc.members.map(m => {
          const mappedMember = { ...m }
          if (mappedMember.age === '3 to 5') mappedMember.age = '3 to 5 Years'
          else if (mappedMember.age === '5 to 8') mappedMember.age = '5 to 8 Years'
          else if (mappedMember.age === '8 to 12') mappedMember.age = '8 to 12 Years'
          else if (mappedMember.age === '12 +') mappedMember.age = '12+ Years'
          return mappedMember
        })
      }
      setForm(f => ({ language: '', ...f, ...mappedDoc }))
    }
  }, [editDoc])

  const showTitle = ['Singing', 'Play'].includes(form.activity)
  const showTopic = ['Speech', 'Fancy Dress'].includes(form.activity)
  const isTeamActivity = TEAM_ACTIVITIES.includes(form.activity)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => {
      let updated = { ...prev, [name]: value }
      if (name === 'activity') {
        updated.age = ''
        updated.language = ''
      }
      return updated
    })
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
    if (form.members.length < 5) {
      setForm(prev => ({
        ...prev,
        members: [...prev.members, { first_name: '', last_name: '', age: '', flat_number: '' }]
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
      
      if (form.activity === 'Anchoring') {
        const ageNum = parseInt(form.age, 10)
        if (isNaN(ageNum) || ageNum < 15) {
          throw new Error('Minimum age for Anchoring is 15 years.')
        }
      }
      
      const { wing, flat_num, ...cleanForm } = form
      
      // Check for existing submission
      const existingQuery = query(
        collection(db, 'submissions'),
        where('uid', '==', user.uid),
        where('activity', '==', cleanForm.activity)
      )
      const existingSnap = await getDocs(existingQuery)
      if (!existingSnap.empty && !editDoc) {
        throw new Error('You have already submitted for this activity')
      }
      const payload = {
        uid: cleanForm.uid || user.uid,
        activity: cleanForm.activity,
        title: showTitle ? cleanForm.title : '',
        topic: showTopic ? cleanForm.topic : '',
        name: `${cleanForm.first_name} ${cleanForm.last_name}`.trim(),
        first_name: cleanForm.first_name,
        last_name: cleanForm.last_name,
        age: cleanForm.age,
        gender: cleanForm.gender,
        flat_number: cleanForm.flat_number,
        mobile_number: cleanForm.mobile_number,
        team_name: isTeamActivity ? cleanForm.team_name : null,
        stall_type: cleanForm.activity === 'BusinessHub' ? cleanForm.stall_type : null,
        other_requirements: cleanForm.activity === 'BusinessHub' ? cleanForm.other_requirements : null,
        is_food_stall: cleanForm.activity === 'BusinessHub' ? cleanForm.is_food_stall : null,
        table_count: cleanForm.activity === 'BusinessHub' ? cleanForm.table_count : null,
        transaction_id: cleanForm.activity === 'BusinessHub' ? cleanForm.transaction_id : null,
        language: cleanForm.activity === 'Anchoring' ? cleanForm.language : null,
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
        setTimeout(() => {
          setMsg('')
          // Reset entire form
          setForm({
            first_name: '',
            last_name: '',
            age: '',
            gender: '',
            flat_number: '',
            mobile_number: '',
            alternate_mobile: '',
            activity: '',
            title: '',
            topic: '',
            team_name: '',
            stall_type: '',
            other_requirements: '',
            is_food_stall: '',
            table_count: '0',
            transaction_id: '',
            language: '',
            members: [{ first_name: '', last_name: '', age: '', flat_number: '' }]
          })
          setAgreedToTerms(false)
        }, 2000)
      }
    } catch (err) {
      setError(err.message)
      setTimeout(() => setError(''), 5000)
    }
  }



  return (
    <div className="container mt-4 mb-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title mb-0">{editDoc ? 'Update Registration' : 'Event Registration'}</h2>
            {editDoc && (
              <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
                ← Back to List
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Select Event</label>
              <select
                className="form-select"
                name="activity"
                value={form.activity}
                onChange={onChange}
                required
              >
                <option value="">Choose event</option>
                <option value="Speech">Speech</option>
                <option value="Play">Play</option>
                <option value="Singing">Singing</option>
                <option value="Fancy Dress">Fancy Dress</option>
                <option value="Anchoring">Anchoring</option>
              </select>
            </div>

            <hr></hr>
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
                {form.activity === 'Anchoring' ? (
                  <>
                    <label className="form-label">Age (in Years)</label>
                    <input
                      className="form-control"
                      type="number"
                      name="age"
                      value={form.age}
                      onChange={onChange}
                      placeholder="Enter age (min 15)"
                      min="15"
                      required
                    />
                  </>
                ) : (
                  <>
                    <label className="form-label">Age Group</label>
                    <select
                      className="form-select"
                      name="age"
                      value={form.age}
                      onChange={onChange}
                      required
                    >
                      <option value="">Select age group</option>
                      <option value="3 to 5 Years">3 to 5 Years</option>
                      <option value="5 to 8 Years">5 to 8 Years</option>
                      <option value="8 to 12 Years">8 to 12 Years</option>
                      <option value="12+ Years">12+ Years</option>
                    </select>
                  </>
                )}
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

            {form.activity === 'Anchoring' && (
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Language</label>
                  <select
                    className="form-select"
                    name="language"
                    value={form.language}
                    onChange={onChange}
                    required
                  >
                    <option value="">Select language</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>
            )}

            <div className="row">
              {showTitle && (
                <div className="col-md-6 mb-3">
                  <label className="form-label">{form.activity === 'Singing' ? 'Song Name' : 'Play Title'}</label>
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

              {showTopic && (
                <div className="col-md-6 mb-3">
                  <label className="form-label">{form.activity === 'Speech' ? 'Speech Topic' : 'Character/Theme'}</label>
                  <input
                    className="form-control"
                    name="topic"
                    value={form.topic}
                    onChange={onChange}
                    placeholder="Enter topic"
                    maxLength={100}
                    required
                  />
                </div>
              )}
            </div>

            {isTeamActivity && (
              <>
                <hr className="my-4" />
                <h6 className="mb-3">Team Members (Max 5)</h6>
                {form.members.slice(1).map((member, index) => (
                  <div key={index + 1} className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Member {index + 2}</h6>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeMember(index + 1)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-md-3 mb-3">
                          <label className="form-label">First Name</label>
                          <input
                            className="form-control"
                            value={member.first_name}
                            onChange={(e) => onMemberChange(index + 1, 'first_name', e.target.value)}
                            placeholder="First name"
                            maxLength={25}
                            required
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            className="form-control"
                            value={member.last_name}
                            onChange={(e) => onMemberChange(index + 1, 'last_name', e.target.value)}
                            placeholder="Last name"
                            maxLength={25}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">Age Group</label>
                          <select
                            className="form-select"
                            value={member.age}
                            onChange={(e) => onMemberChange(index + 1, 'age', e.target.value)}
                            required
                          >
                            <option value="">Select age group</option>
                            <option value="3 to 5 Years">3 to 5 Years</option>
                            <option value="5 to 8 Years">5 to 8 Years</option>
                            <option value="8 to 12 Years">8 to 12 Years</option>
                            <option value="12+ Years">12+ Years</option>
                          </select>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="form-label">Flat Number</label>
                          <input
                            className="form-control"
                            value={member.flat_number}
                            onChange={(e) => onMemberChange(index + 1, 'flat_number', e.target.value)}
                            placeholder="e.g., A-101"
                            maxLength={10}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {form.members.length < 5 && (
                  <button
                    type="button"
                    className="btn btn-outline-primary mb-3"
                    onClick={addMember}
                  >
                    <span className="material-icons">add</span> Add Team Member
                  </button>
                )}
              </>
            )}

            <hr className="my-4" />
            <h6 className="mb-3">Contact Details</h6>
            <div className="row">
              <div className="col-md-4 mb-3">
                <FlatNumberInput
                  wing={form.flat_number.split('-')[0] || ''}
                  flatNum={form.flat_number.split('-')[1] || ''}
                  onWingChange={(value) => onFlatChange('wing', value)}
                  onFlatChange={(value) => onFlatChange('flat_num', value)}
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

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheck"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the <a href="/events" target="_blank" rel="noopener noreferrer">terms and conditions</a>
              </label>
            </div>

            {error && (
              <div className="alert alert-danger">
                ⚠ {error}
              </div>
            )}
            {msg && <div className="alert alert-success">✅ {msg}</div>}
            <div className="mt-3">
              <button className="btn btn-primary" type="submit" disabled={!agreedToTerms}>
                {editDoc ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}