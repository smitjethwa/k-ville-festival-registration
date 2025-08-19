import React, { useState, useRef, useEffect } from 'react'

const FLAT_NUMBERS = {
  A: ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401',
       '102', '202', '302', '402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402',
       '103', '203', '303', '403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403',
       '104', '204', '304', '404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404',
       '105', '205', '305', '405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405',
       '106', '206', '306', '406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406',
       '107', '207', '307', '407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407',
       '108', '208', '308', '408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408'],
  B: ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401',
       '102', '202', '302', '402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402',
       '103', '203', '303', '403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403',
       '104', '204', '304', '404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404',
       '105', '205', '305', '405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405',
       '106', '206', '306', '406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406',
       '107', '207', '307', '407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407',
       '108', '208', '308', '408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408',
       '109', '209', '309', '409', '509', '609', '709', '809', '909', '1009', '1109', '1209', '1309', '1409',
       '110', '210', '310', '410', '510', '610', '710', '810', '910', '1010', '1110', '1210', '1310', '1410'],
  C: ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001', '1101', '1201', '1301', '1401',
       '102', '202', '302', '402', '502', '602', '702', '802', '902', '1002', '1102', '1202', '1302', '1402',
       '103', '203', '303', '403', '503', '603', '703', '803', '903', '1003', '1103', '1203', '1303', '1403',
       '104', '204', '304', '404', '504', '604', '704', '804', '904', '1004', '1104', '1204', '1304', '1404',
       '105', '205', '305', '405', '505', '605', '705', '805', '905', '1005', '1105', '1205', '1305', '1405',
       '106', '206', '306', '406', '506', '606', '706', '806', '906', '1006', '1106', '1206', '1306', '1406',
       '107', '207', '307', '407', '507', '607', '707', '807', '907', '1007', '1107', '1207', '1307', '1407',
       '108', '208', '308', '408', '508', '608', '708', '808', '908', '1008', '1108', '1208', '1308', '1408']
}

export default function FlatNumberInput({ wing, flatNum, onWingChange, onFlatChange, disabled = false, required = false }) {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (wing && flatNum) {
      const filtered = FLAT_NUMBERS[wing]?.filter(num => 
        num.startsWith(flatNum)
      ).slice(0, 10) || []
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0 && flatNum.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [wing, flatNum])

  const handleFlatChange = (e) => {
    const value = e.target.value
    // Allow typing any numeric input, validation happens on blur
    if (/^\d*$/.test(value)) {
      onFlatChange(value)
    }
  }

  const selectSuggestion = (suggestion) => {
    onFlatChange(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="position-relative">
      <div className="row">
        <div className="col-6">
          <label className="form-label">Wing</label>
          <select
            className="form-select"
            value={wing}
            onChange={(e) => onWingChange(e.target.value)}
            disabled={disabled}
            required={required}
          >
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="col-6">
          <label className="form-label">Flat Number</label>
          <input
            ref={inputRef}
            className="form-control"
            value={flatNum}
            onChange={handleFlatChange}
            onFocus={() => wing && flatNum && setShowSuggestions(suggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Enter flat number"
            disabled={disabled}
            required={required}
            style={wing && flatNum && !FLAT_NUMBERS[wing]?.includes(flatNum) ? {borderColor: '#dc3545'} : {}}
          />
          {showSuggestions && (
            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{zIndex: 1000, top: '100%'}}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover-bg-light"
                  style={{cursor: 'pointer'}}
                  onMouseDown={() => selectSuggestion(suggestion)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {wing}-{suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}