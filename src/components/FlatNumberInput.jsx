import React from 'react'

export default function FlatNumberInput({ wing, flatNum, onWingChange, onFlatChange, disabled = false, required = false }) {
  const handleFlatChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      onFlatChange(value)
    }
  }

  return (
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
          {/* <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option> */}

        </select>
      </div>
      <div className="col-6">
        <label className="form-label">Flat Number</label>
        <input
          className="form-control"
          value={flatNum}
          onChange={handleFlatChange}
          placeholder="Enter flat number"
          disabled={disabled}
          required={required}
        />
      </div>
    </div>
  )
}