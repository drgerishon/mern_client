
import React from 'react';
import { Icon } from '@iconify/react';
import './Datepicker.css'


const DatePicker = ({ dob, handleChange }) => {
  return (
    <div className="mb-3">
      <label>Date of birth</label>
      <div className="input-group">
        <input
          type="date"
          className="form-control"
          name="dob"
          value={dob ? dob.toISOString().substr(0, 10) : ""}
          onChange={handleChange}
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <Icon icon="uit:calender" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DatePicker
