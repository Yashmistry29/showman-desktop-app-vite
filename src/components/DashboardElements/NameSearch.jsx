import React, { useState, useEffect } from 'react'
import { CssTextField } from '../FormElements/TextfieldForm';
import { NameSearch as initialValues } from '../../utils/Data/InitialValues';
import { Autocomplete, createFilterOptions } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { sendRequest } from '../../utils/Helpers/HelpersMethod';

function NameSearch({ data, setData, setPage }) {

  const [names, setNames] = useState([]);
  const [search, setSearch] = useState(initialValues)
  const resetData = initialValues;

  const handleSearch = () => {
    // console.log(search);
    if (search.name !== '-') {
      sendRequest("/job/getAllJobDataByName", "POST", search)
        .then((res) => {
          if (res.success) {
            var data = res.data.reverse();
            setData({
              customerData: res.customerData,
              jobData: data
            })
          }
        })
    }
    if (search.mobile !== '') {
      sendRequest('/job/getAllJobDataByMobile', 'POST', search)
        .then((res) => {
          // console.log(res);
          var data = res.data.reverse();
          if (res.success) {
            setData({
              customerData: res.customerData,
              jobData: data
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
  }

  const handleReset = () => {
    setSearch(resetData);
    setData({});
    setPage(0);
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  }

  const handleAutocomplete = (e, value, option) => {
    // console.log(value, option)
    setSearch({ ...search, name: value.c_id });
  }

  useEffect(() => {
    sendRequest("/customer/getnamelist", 'POST')
      .then((res) => {
        if (res.success) {
          console.log(res.data)
          setNames(res.data)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(search);

  return (
    <div>
      <ToastContainer />
      <fieldset className='bg-slate-50/70 rounded-2xl shadow-xl shadow-gray-300/25 border-2'>
        <legend className='ml-4 px-2 font-bold'>Search Job using Name or Mobile/ નામ અથવા મોબાઈલ નં.</legend>
        <div className='flex flex-col gap-4 py-4 px-8'>
          <div className='flex justify-start items-center w-3/4'>
            <pre className='font-medium pr-2'>Enter Name  </pre>
            <Autocomplete
              disableClearable
              options={names}
              fullWidth
              size="small"
              onChange={(e, value) => {
                // store selected customer ID in state
                setSearch({ ...search, name: value ? value.c_id : "-" });
              }}
              filterOptions={createFilterOptions({
                matchFrom: "start",
                stringify: (option) => option.name ?? ""
              })}
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
              // map stored c_id back to option object for controlled value
              value={names.find((item) => item.c_id === search.name) || null}
              getOptionLabel={(option) => option.name ?? ""}
              renderInput={(params) => (
                <CssTextField
                  {...params}
                  variant="outlined"
                  autoFocus
                />
              )}
            />
          </div>
          <p className='font-medium'>or</p>
          <div className='flex justify-start items-center w-3/4 py-2'>
            <pre className='font-medium pr-2'>Enter Mobile </pre>
            <CssTextField
              variant='outlined'
              name='mobile'
              size='small'
              slotProps={{
                input: {style: {maxLength: 10}}
              }}
              value={search.mobile}
              onChange={handleChange}
              fullWidth
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
    </div>
  )
}

export default NameSearch