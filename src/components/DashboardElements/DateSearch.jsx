import React from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { CssTextField } from '../FormElements/TextfieldForm';
import { toast, ToastContainer } from 'react-toastify';
import { sendRequest } from '../../utils/Helpers/HelpersMethod';
import moment from 'moment';

function DateSearch({ data, setData, setPage }) {
  const [value, setValue] = React.useState({
    startDate: moment(),
    endDate: moment()
  })


  const handleSearch = () => {
    // console.log(value)
    sendRequest('/job/getJobsBetweenDates', 'POST', value)
      .then((res) => {
        // console.log(res)
        if (res.success) {
          setData({
            customerData: res.customerData,
            jobData: res.data
          })
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
  }

  const handleReset = () => {
    setValue({
      startDate: moment(),
      endDate: moment()
    });
    setData({});
    setPage(0);
  }
  

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ToastContainer />
      <fieldset className='bg-slate-50/70 rounded-2xl shadow-2xl border-2'>
        <legend className='ml-4 px-2 font-bold'>Find Job Between</legend>
        <div className='flex flex-col gap-4 py-4 px-8'>
          <div className='flex justify-start items-center w-8/12'>
            <pre className='font-medium pr-2'>Start Date</pre>
            <DatePicker
              enableAccessibleFieldDOMStructure={false}
              views={['year', 'month', 'day']}
              format='DD-MMMM-YYYY'
              minDate={new moment('2010-01-01')}
              value={value.startDate}
              onChange={newValue => {
                console.log(newValue)
                setValue({ ...value, startDate: newValue });
              }}
              name='startDate'
              slots={{
                textField: CssTextField
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  margin: "none",
                  fullWidth: true,
                  variant: 'outlined',
                }
              }}
            />
          </div>
          <p className='font-medium pr-2'>and</p>
          <div className='flex justify-start items-center w-8/12 py-2'>
            <pre className='font-medium pr-2'>End Date  </pre>
            <DatePicker
              enableAccessibleFieldDOMStructure={false}
              disableMaskedInput
              format='DD-MMMM-YYYY'
              views={['year', 'month', 'day']}
              minDate={new moment('2010-01-01')}
              value={value.endDate}
              onChange={(newValue) => {
                setValue({ ...value, endDate: newValue});
              }}
              name='endDate'
              slots={{
                textField: CssTextField
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  margin: "none",
                  fullWidth: true,
                }
              }}
            />
          </div>
          <div className='flex justify-start gap-3 w-10/12 py-2'>
            <button
              className='cursor-pointer bg-cyan-900 rounded-xl p-2 w-2/3 text-white shadow-xl border-black border-2'
              onClick={handleSearch}
            >Search</button>
            <button
              className='cursor-pointer bg-cyan-900 rounded-xl p-2 w-2/3 text-white shadow-xl border-black border-2'
              onClick={handleReset}
            >Reset</button>
          </div>
        </div>
      </fieldset>
    </LocalizationProvider>
  )
}

export default DateSearch