import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import { db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import FlatNumberInput from './FlatNumberInput'

export default function ProfilePage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name:'', flat_number:'', mobile_number:'' })
  const [msg, setMsg] = useState('')
  const [isEditing, setIsEditing] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!user) return
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        const u = snap.data()
        setForm(f => ({...f, name: u.name || '', flat_number: u.flat_number || '', mobile_number: u.mobile_number || ''}))
        // If user has profile data, show in view mode
        if (u.name && u.flat_number && u.mobile_number) {
          setIsEditing(false)
        }
      }
    }
    load()
  }, [user])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onFlatChange = (field, value) => {
    const parts = form.flat_number.split('-')
    const wing = field === 'wing' ? value : (parts[0] || '')
    const flatNum = field === 'flat_num' ? value : (parts[1] || '')
    setForm(prev => ({ ...prev, flat_number: `${wing}-${flatNum}` }))
  }

  const save = async (e) => { 
    e.preventDefault()
    const { wing, flat_num, ...cleanForm } = form
    
    // Validate flat number
    const wingPart = cleanForm.flat_number.split('-')[0]
    const flatPart = cleanForm.flat_number.split('-')[1]
    const validFlats = {
      A: ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401', '102', '202', '302', '402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402', '103', '203', '303', '403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403', '104', '204', '304', '404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404', '105', '205', '305', '405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405', '106', '206', '306', '406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406', '107', '207', '307', '407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407', '108', '208', '308', '408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408'],
      B: ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401', '102', '202', '302', '402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402', '103', '203', '303', '403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403', '104', '204', '304', '404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404', '105', '205', '305', '405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405', '106', '206', '306', '406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406', '107', '207', '307', '407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407', '108', '208', '308', '408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408', '109', '209', '309', '409', '509', '609', '709', '809', '909', '1009', '1109', '1209', '1309', '1409', '110', '210', '310', '410', '510', '610', '710', '810', '910', '1010', '1110', '1210', '1310', '1410'],
      C: ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401', '102', '202', '302', '402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402', '103', '203', '303', '403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403', '104', '204', '304', '404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404', '105', '205', '305', '405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405', '106', '206', '306', '406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406', '107', '207', '307', '407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407', '108', '208', '308', '408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408']
    }
    
    if (!validFlats[wingPart]?.includes(flatPart)) {
      alert('Invalid flat number. Please select a valid flat number from the suggestions.')
      return
    }
    
    await setDoc(doc(db, 'users', user.uid), { ...cleanForm, updated_at: new Date() }, { merge: true })
    setMsg('Profile saved ✅')
    setIsEditing(false)
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">My Profile</h2>
              {!isEditing ? (
                <div>
                  <div className="mb-3">
                    <strong>Name:</strong> {form.name || 'Not set'}
                  </div>
                  <div className="mb-3">
                    <strong>Flat Number:</strong> {form.flat_number || 'Not set'}
                  </div>
                  <div className="mb-3">
                    <strong>Mobile Number:</strong> {form.mobile_number || 'Not set'}
                  </div>
                  <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                    <span className="material-icons">edit</span> Edit Profile
                  </button>
                </div>
              ) : (
              <form onSubmit={save}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" name="name" value={form.name} onChange={onChange} maxLength={50} required/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <FlatNumberInput
                      wing={form.flat_number.split('-')[0] || ''}
                      flatNum={form.flat_number.split('-')[1] || ''}
                      onWingChange={(value) => onFlatChange('wing', value)}
                      onFlatChange={(value) => onFlatChange('flat_num', value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
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
                <div className="d-flex gap-2">
                  <button className="btn btn-primary" type="submit">Save</button>
                  <button className="btn btn-secondary" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
              )}
              {msg && <div className="alert alert-success mt-3">{msg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
