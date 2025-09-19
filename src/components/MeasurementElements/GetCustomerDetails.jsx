import React, { useEffect } from 'react'
import { Autocomplete, MenuItem, createFilterOptions } from '@mui/material';
import { CssTextField } from '../FormElements/TextfieldForm';
import { sendRequest } from "../../utils/Helpers/HelpersMethod";
import { useMeasurement } from '../context/MeasurementContext';

export const GetCustomerDetails = () => {
  const {names,selectedCustomer,setSelectedCustomer,setJobId,jobId,setCustomerData,setView,jobSelect,setJobSelect,jobIds,setJobIds,initialJobData,setSdata,setPdata,setUpdate} = useMeasurement();


  const handleChange = (e, value, option) => {
    setSelectedCustomer(value);
    console.log(value.job_ids)
    if (value.job_ids === undefined) {
      setJobSelect(false);
      setJobIds(0);
      setUpdate(false);
    } else {
      setJobSelect(true);
      setJobIds(value.job_ids);
      setUpdate(true);
    }
  }

  const handleSelect = (e) => {
    setJobId(e.target.value)
  }

  const handleView = (e) => {
    e.preventDefault();
    if (jobSelect) {
      sendRequest('/job/getJob', 'POST', { job_id: jobId})
        .then((resp) => {
          if (resp.success) {
            const data = resp.data;
            // console.log(data.shirt_data.price, data.pant_data.price, price);
            if (data.shirt_quantity === 0 || data.shirt_quantity === undefined) {
              // setQuantities(prev => ({ shirt: 1, pant: prev.pant }));
              setSdata(initialJobData.shirt_data);
            } else {
              // data.shirt_data["price"] = price.shirt;
              // setQuantities(prev => ({ shirt: data.shirt_quantity, pant: prev.pant }));
              setSdata(data.shirt_data);
            }

            if (data.pant_quantity === 0 || data.pant_quantity === undefined) {
              // setQuantities(prev => ({ pant: 1, shirt: prev.shirt }));
              setPdata(initialJobData.pant_data);
            } else {
              // setQuantities(prev => ({ pant: data.pant_quantity, shirt: prev.shirt }));
              // data.pant_data["price"] = price.pant;
              setPdata(data.pant_data);
            }
          }
        })
    }
    else {
      setPdata(initialJobData.pant_data);
      setSdata(initialJobData.shirt_data);
    }
  }

  // console.log(selectedCustomer,jobIds)
  useEffect(() => {
    if (selectedCustomer) {
      sendRequest("/customer/getcustomer", "POST", { c_id: selectedCustomer.c_id })
        .then((res) => {
          if (res.success) {
            // console.log(res.data)
            setView(true);
            setCustomerData(res.data);
          }
        })
    }
  }, [selectedCustomer, setCustomerData, setView])

  // console.log(selectedCustomer)
  return (
    <fieldset className='bg-slate-50/70 rounded-tr-2xl shadow-xl border-2'>
      <legend className='ml-4 px-2 font-bold'>Find Customer</legend>
      <div className='flex flex-col gap-4 py-3 px-8 my-auto'>
        <div className='flex justify-start items-center w-10/12'>
        <pre className='font-medium pr-2'>Enter Name  </pre>
          <Autocomplete
            // disablePortal
            disableClearable
            options={names}
            value={selectedCustomer}
          fullWidth
          // size='small'
            onChange={handleChange}
            slotProps={{
              listbox: {
                sx: {
                  "& li": {
                    backgroundColor: "white",
                  },
                  "&:hover": {
                    backgroundColor: "#0891b2",
                  }
                }
              }
            }}
            filterOptions={createFilterOptions({
              matchFrom: "start",
              stringify: (option) => option.name
            })}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <CssTextField
              {...params}
              variant='outlined'
              name='name'
              className='w-80'
            />}
          />
          {/* <CssTextField
            variant='outlined'
            name='name'
            className='w-50'
          /> */}
        </div>
        <div className='flex justify-start items-center w-10/12 gap-3'>
        <pre className='font-medium pr-2'>Select Job  </pre>
          <CssTextField
            select={jobSelect}
            disabled={!jobSelect}
            variant='outlined'
            name='jobId'
            className='w-3/5'
            onChange={handleSelect}
            value={jobId}
            // size="small"
          >
            {
              jobIds.map((val) => (
                <MenuItem key={val} value={val} sx={{
                  "& li": {
                    backgroundColor: "white",
                  },
                  "&:hover": {
                    backgroundColor: "#0891b2",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "#0891b2",
                  }
                }}>
                  {val}
                </MenuItem>
              ))
            }
          </CssTextField>
          <button
            // className='button-border b--black link pointer tc ma2 bg-button light-gray ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
          className='cursor-pointer bg-cyan-900 rounded-lg p-3 w-2/5 text-white shadow-xl border-black border-2'
            onClick={handleView}
          >View</button>
        </div>
      </div>
      </fieldset>
  )
}

export default GetCustomerDetails