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

const ACTIVITIES = ['BusinessHub']
const TEAM_ACTIVITIES = ['BusinessHub']

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
    team_name: '',
    stall_type: '',
    other_requirements: '',
    is_food_stall: '',
    table_count: '0',
    transaction_id: '',
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
    if (editDoc) setForm(f => ({ ...f, ...editDoc }))
  }, [editDoc])

  const showTitle = ['Dance', 'Singing'].includes(form.activity)
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
    if (form.members.length < 5) {
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
        activity: 'BusinessHub',
        title: showTitle ? cleanForm.title : '',
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
            activity: 'BusinessHub',
            title: '',
            team_name: '',
            stall_type: '',
            other_requirements: '',
            is_food_stall: '',
            table_count: '0',
            transaction_id: '',
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
        <div className="card-body text-center">
          <h2 className="card-title text-danger">
            <span className="material-icons">event_busy</span> Registration Closed
          </h2>
          <p className="text-muted mb-4">Event registrations are now closed. Thank you for your interest!</p>
          <div className="alert alert-info">
            <p className="mb-2">Follow us on Instagram for updates:</p>
            <a 
              href="https://instagram.com/festival_kville_iii_iv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-decoration-none fw-bold"
            >
              @festival_kville_iii_iv
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}	