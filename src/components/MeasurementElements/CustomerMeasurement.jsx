
import React from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import PantGrid from './PantGrid';
import ShirtGrid from './ShirtGrid';
import { useMeasurement } from '../context/MeasurementContext';

// Reusable Fieldset component for Pant/Shirt
function MeasurementFieldset({ checked, name, label, onChange, children }) {
  return (
    <fieldset className={`${checked ? 'border-black border-4' : 'border-stone-400 border-2'}`} >
      <legend className={`${checked ? 'text-black font-bold' : 'text-stone-400 font-medium'} ml-4 px-2`}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                name={name}
                onChange={onChange}
                sx={{ '&.Mui-checked': { color: '#000' } }}
              />
            }
            label={<span className='text-lg font-medium'>{label}</span>}
          />
        </FormGroup>
      </legend>
      {children}
    </fieldset>
  );
}

function CustomerMeasurement() {
  const { checkedData, setCheckedData } = useMeasurement();

  const handleChange = (e) => {
    setCheckedData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 justify-between mx-auto w-11/12 mt-2 gap-8">
      <MeasurementFieldset
        checked={checkedData.pant}
        name="pant"
        label="Pant Measurement/ પેન્ટ નુ માપ"
        onChange={handleChange}
      >
        <PantGrid/>
      </MeasurementFieldset>
      <MeasurementFieldset
        checked={checkedData.shirt}
        name="shirt"
        label="Shirt Measurement/ શર્ટ નુ માપ"
        onChange={handleChange}
      >
        <ShirtGrid/>
      </MeasurementFieldset>
    </div>
  );
}

export default CustomerMeasurement;