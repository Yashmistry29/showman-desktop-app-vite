import React from 'react';
import CustomerDataDisplay from '../components/MeasurementElements/CustomerDataDisplay';
import GetCustomerDetails from '../components/MeasurementElements/GetCustomerDetails';
import CustomerMeasurement from '../components/MeasurementElements/CustomerMeasurement';
import { CssTextField } from '../components/FormElements/TextfieldForm';
import { ToastContainer } from 'react-toastify';
// import '../styles/dashboard.scss';
const electron = window.require("electron");
import { useMeasurement } from '../components/context/MeasurementContext';

function Measurement() {

  const { ResetData, returnDate, setReturnDate, errors, id, totalPrice, submitData } = useMeasurement();

  const handleSubmit = () => {
    submitData();
  }


  const handleReset = () => {
    ResetData();
  };

  return (
    <div className='font mt-4'>
      <ToastContainer />
      <div className='my-auto'>
        <div className='grid md:grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto gap-8'>
          <CustomerDataDisplay />
          <GetCustomerDetails />
        </div>
      </div>
      <CustomerMeasurement />
      {/* donot change UI for this div tag */}
      <div className='flex justify-evenly items-center w-11/12 mx-auto border-2 rounded-b-xl bg-stone-300 py-4 mt-5 gap-4 px-4'>
        <p className='font-medium text-lg pr-2 my-auto mr-2'>{`Job Id: ${id}`}</p>
        <p className='pr-2 text-lg font-medium'>Total Price: <span className='b'>{totalPrice}</span>&#8377;</p>
        <p className='text-lg font-medium pr-2'> {new Date().toDateString()}</p>
        <div className='flex justify-start items-center w-3/12'>
          <pre className='text-lg font-medium pr-2'>Return Date</pre>
          <CssTextField
            name='ReturnDate'
            type='date'
            size='small'
            className='w-full'
            value={returnDate}
            onChange={(e) => { setReturnDate(e.target.value); }}
            error={Boolean(errors.date.date)}
            helperText={errors.date.date}

          />
        </div>
        <div className='flex justify-start items-center w-3/12 gap-2'>
          <button
            className='cursor-pointer bg-green-700 rounded-md w-1/2 border-2 py-1.5 text-white border-black'
            onClick={handleSubmit}
          >Submit</button>
          <button
            className='cursor-pointer bg-white rounded-md w-1/2 border-2 py-1.5 border-black'
            onClick={handleReset}
          >Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Measurement