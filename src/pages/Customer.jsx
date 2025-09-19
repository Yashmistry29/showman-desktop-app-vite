import React, { useState, useEffect } from 'react'
import { Avatar, Grid, Autocomplete, createFilterOptions } from '@mui/material'
import { CreateCustomer } from '../utils/Data/InitialValues';
import { ValidateCustomer } from '../utils/Validation/FormValidation';
import { toast, ToastContainer } from 'react-toastify';
import { CssTextField as TextField } from "../components/FormElements/TextfieldForm";
import { sendRequest } from '../utils/Helpers/HelpersMethod';
import { CustomerSearch as initialValues } from '../utils/Data/InitialValues';
import { NewCustomer } from '../utils/Data/InitialValues';
// import AddIcon from '@mui/icons-material/Add';
// import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import '../styles/dashboard.scss'

function Customer() {

  const [newCustomer, setNewCustomer] = useState(NewCustomer);
  const [search, setSearch] = useState(null)
  const [data, setData] = useState(CreateCustomer);
  // const [c_id, setId] = useState();
  const [errors, setErrors] = useState({});
  const resetData = CreateCustomer;
  const [names, setNames] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleAutocomplete = (e, value, option) => {
    console.log(value, option)
    setSearch(value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(data)
    const validationErrors = ValidateCustomer(data);
    const isValid = Object.keys(validationErrors).length === 0;
    // console.log(validationErrors, isValid);
    setErrors(validationErrors);
    if (isValid) {
      console.log(data);
      const route = newCustomer ? '/customer/create' : '/customer/edit'
      sendRequest(route, "POST", data)
        .then((res) => {
          if (res.success) {
            toast.success(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            handleReset();
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
    } else {
      console.log(errors);
      toast.error("Enter Customer Details Properly");
    }
  }

  const handleReset = () => {
    setSearch(null)
    setData(resetData);
    setErrors({})
    setNewCustomer(true);
  }

  console.log(search)

  const handleFind = (e) => {
    console.log(search);
    sendRequest('/customer/getcustomer', 'POST', { c_id: search.c_id })
      .then(res => {
        if (res) {
          var val = {
            c_id: res.data.c_id,
            name: res.data.name,
            phone: res.data.phone,
            phone2: res.data.phone2,
            address: res.data.address
          }
          // console.log(data)
          setNewCustomer(false)
          setData(val);
        }
      })
  }

  useEffect(() => {
    if (newCustomer && data.c_id === 0) {
      sendRequest("/customer/getid", "POST")
        .then((res) => {
          if (res.success) {
            setData({ c_id: res.message });
          }
        })
    }
  }, [newCustomer, data.c_id])

  useEffect(() => {
    sendRequest("/customer/getnamelist", 'POST')
      .then((res) => {
        if (res.success) {
          console.log(res.data)
          setNames(res.data);
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='font'>
      <ToastContainer />
      <div className='grid grid-rows-1 justify-center p-4 mx-4 mt-4'>
        <div className='flex justify-start items-center w-full gap-4'>
          <pre className='pr2 black'>Search            </pre>
          <Autocomplete
            options={names}
            fullWidth
            size='small'
            onChange={handleAutocomplete}
            filterOptions={createFilterOptions({
              matchFrom: "start",
              stringify: (option) => option.name ?? ""
            })}
            slotProps={{
                listbox: {
                  sx:{
                    "& li": {
                      backgroundColor: "white",
                    },
                    "&:hover": {
                      backgroundColor: "#0891b2",
                    }
                  }
                } 
              }}
            value={search}
            getOptionLabel={(option) => option.name ?? ""}
            renderInput={(params) => <TextField
              {...params}
              variant='outlined'
              autoFocus
            />}
          />
          <button
            onClick={handleFind}
            className='cursor-pointer py-1 border-black border-2 w-1/2 bg-emerald-600 font-bold text-white rounded-md shadow-md shadow-black'
          >Search</button>
        </div>
        <div className='grid grid-cols-3 gap-3 items-center my-6'>
          <div className='grid grid-cols-1 col-span-2 gap-4'>
            <div className='flex justify-start items-center'>
              <pre className='pr2 black'>{`Customer Id        #${data.c_id}`}</pre>
            </div>
            <div className='flex justify-start items-center'>
              <pre className='pr2 black'>Enter Name       </pre>
              <TextField
                variant='outlined'
                autoFocus
                name='name'
                size='small'
                value={data.name || ""}
                onChange={handleChange}
                {...(errors.name && { error: true, helperText: errors.name })}
                className='w-100'
              />
            </div>
            <div className='flex justify-start items-center'>
              <pre className='pr2 black'>Enter Contact 1 </pre>
              <TextField
                variant='outlined'
                name='phone'
                inputProps={{ maxLength: 10 }}
                value={data.phone || ""}
                size='small'
                onChange={handleChange}
                {...(errors.phone && { error: true, helperText: errors.phone })}
                className='w-100'
              />
            </div>
            <div className='flex justify-start items-center'>
              <pre className='pr2 black'>Enter Contact 2 </pre>
              <TextField
                variant='outlined'
                name='phone2'
                inputProps={{ maxLength: 10 }}
                size='small'
                value={data.phone2 || ""}
                onChange={handleChange}
                {...(errors.phone2 && { error: true, helperText: errors.phone2 })}
                className='w-100'
              />
            </div>  
          </div>
          <div className='col-span-1 px-5'>
            <Avatar variant="rounded" sx={{ background: "#19A974", height: 175, width: 175 }}>
              <PersonAddIcon className="center" sx={{ fontSize: 100 }} />
            </Avatar>
          </div>
        </div>
        <div className='flex justify-start items-center ma3'>
          <pre className='pr2 black'>Enter Address   </pre>
          <TextField
            variant='outlined'
            name='address'
            value={data.address ||""}
            onChange={handleChange}
            {...(errors.address && { error: true, helperText: errors.address })}
            className='w-100'
            multiline
            fullWidth
            rows={3}
          />
        </div>
        <div className='flex justify-center gap-2 mx-auto w-4/5 my-6' >
          <button
            className='cursor-pointer border-black border-2 w-1/2 bg-white font-bold rounded-md shadow-md py-2 shadow-black'
            onClick={handleClick}
          >{newCustomer ? 'Create Customer' : 'Update Customer'} </button>
          <button
            className='cursor-pointer border-black border-2 w-1/2 bg-emerald-600 font-bold text-white rounded-md shadow-md shadow-black'
            onClick={handleReset}
          >Reset</button>
      </div>
    </div>
  </div >
  )
}

export default Customer