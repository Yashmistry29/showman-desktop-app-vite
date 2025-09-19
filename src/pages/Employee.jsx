import { Autocomplete, Avatar, createFilterOptions, Grid, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { CssTextField as TextField } from '../components/FormElements/TextfieldForm'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NewEmployee,EmployeeType,WagesType,CreateEmployee,EmployeeSearch } from '../utils/Data/InitialValues';
import { sendRequest } from '../utils/Helpers/HelpersMethod';


export default function Employee() {
  const [newEmployee, setNewEmployee] = useState(NewEmployee);
  const [data, setData] = useState(CreateEmployee);
  const [search, setSearch] = useState(EmployeeSearch)
  const [names, setNames] = useState([]);
  const resetData = CreateEmployee;
  const [errors, setErrors] = useState({});
  const [e_id, setId] = useState();
  
  

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value||""
    });
  }

  const handleReset = () => {
    setData(resetData);
    setErrors({})
    setNewEmployee(true);
  }

  const handleAutocomplete = (e, value, option) => {
    console.log(value, option)
    setSearch({ ...search, name: value.id });
    setId(value.id)
  }

  const handleFind = (e) => {
      setNewEmployee(false)
      sendRequest('/employee/getemployee', 'POST', { e_id: e_id })
        .then(res => {
          if (res) {
            console.log(res)
            var val = {...res.data }
            // console.log(data)
            setData(val);
          }
        })
    }

  useEffect(() => {
    if (newEmployee) {
      sendRequest('/employee/getid', "POST")
        .then((res) => {
          // console.log(res)
          if (res.success) {
            setData({ e_id: res.data });
          }
      })
    }
  }, [newEmployee])
  
  useEffect(() => {
      sendRequest("/employee/getnamelist", 'POST')
        .then((res) => {
          if (res.success) {
            console.log(res.data)
            setNames(res.data);
          }
        })
    }, [])

  console.log(data,names,search);
  return (
      <div className='font'>
      <ToastContainer />
      <div className='grid grid-rows-1 justify-center p-4 mx-4 mt-4'>
        <div className='flex justify-start items-center w-full gap-4'>
          <pre className='pr2 black'>Search               </pre>
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
              <pre className='pr2 black'>{`Employee Id        #${data.e_id}`}</pre>
            </div>
            <div className='flex justify-start items-center'>
              <pre className='pr2 black'>Enter Name        </pre>
              <TextField
                variant='outlined'
                autoFocus
                name='name'
                value={data.name || ""}
                size='small'
                onChange={handleChange}
                // {...(errors.name && { error: true, helperText: errors.name })}
                className='w-100'
              />
            </div>
            <div className='flex justify-start items-center'>
              <pre className='pr2 black'>Enter Contact     </pre>
              <TextField
                variant='outlined'
                name='phone'
                inputProps={{ maxLength: 10 }}
                size='small'
                value={data.phone || ""}
                onChange={handleChange}
                // {...(errors.phone && { error: true, helperText: errors.phone })}
                className='w-100'
              />
            </div>
            <div className='flex justify-start items-center'>
              <pre className='pr2 black'>Employee Type   </pre>
              <TextField
                select
                variant='outlined'
                name='type'
                className='w-100'
                onChange={handleChange}
                value={data.type || ""}
                // {...(errors.shirt_type && { error: true, helperText: errors.shirt_type })}
                size="small"
              >
                {
                  EmployeeType.map((type) => (
                    <MenuItem key={type.value} value={type.value} sx={{
                      "& li": {
                        backgroundColor: "white",
                      },
                      "&:hover": {
                        backgroundColor: "#9966cb",
                      },
                      "&.Mui-focusVisible": {
                        backgroundColor: "#9966cb",
                      }
                    }}>
                      {type.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            </div>
            <div className='flex justify-start items-center'>
              <pre className='pr2 black'>Employee Wage </pre>
              <TextField
                select
                variant='outlined'
                name='wages_type'
                className='w-100'
                onChange={handleChange}
                value={data.wages_type || ""}
                // {...(errors.shirt_type && { error: true, helperText: errors.shirt_type })}
                size="small"
              >
                {
                  WagesType.map((type) => (
                    <MenuItem key={type.value} value={type.value} sx={{
                      "& li": {
                        backgroundColor: "white",
                      },
                      "&:hover": {
                        backgroundColor: "#9966cb",
                      },
                      "&.Mui-focusVisible": {
                        backgroundColor: "#9966cb",
                      }
                    }}>
                      {type.name}
                    </MenuItem>
                  ))
                }
              </TextField>
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
            // onClick={handleClick}
          >{newEmployee ? 'Create Customer' : 'Update Customer'} </button>
          <button
            className='cursor-pointer border-black border-2 w-1/2 bg-emerald-600 font-bold text-white rounded-md shadow-md shadow-black'
            onClick={handleReset}
          >Reset</button>
        </div>
      </div>
      {/*<Grid container direction="column" justifyContent="center" className='pa2'>
          <Grid item xs className='ml3 mr3 mt3'>
            <div className='flex justify-start items-center'>
              <pre className='pr2 black'>Search               </pre>
              <Autocomplete
                freeSolo
                options={names}
                fullWidth
                size='small'
                onChange={handleAutocomplete}
                filterOptions={createFilterOptions({
                  matchFrom: "start",
                  stringify: (option) => option.name
                })}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField
                  {...params}
                  value={search.name}
                  variant='outlined'
                  className='w-100'
                />}
              />
              <button
                onClick={handleFind}
                className="button-border pointer tc mh2 bg-dark-green b--black light-gray ba bw1 dim dib w-30 h2 br2 b"
              >Search</button>
            </div>
          </Grid>
          <Grid item xs>
            <Grid container direction="row" alignItems="center">
              <Grid item xs className='ma3'>
                <div className='flex justify-start items-center'>
                  <pre className='pr2 black'>{`Employee Id        #${data.e_id}`}</pre>
                </div>
                <div className='flex justify-start items-center'>
                  <pre className='pr2 black'>Enter Name       </pre>
                  <TextField
                    variant='outlined'
                    autoFocus
                    name='name'
                    value={data.name ||""}
                    onChange={handleChange}
                    // {...(errors.name && { error: true, helperText: errors.name })}
                    className='w-100'
                  />
                </div>
                <div className='flex justify-start items-center'>
                  <pre className='pr2 black'>Enter Contact    </pre>
                  <TextField
                    variant='outlined'
                    name='phone'
                    inputProps={{ maxLength: 10 }}
                    value={data.phone ||""}
                    onChange={handleChange}
                    // {...(errors.phone && { error: true, helperText: errors.phone })}
                    className='w-100'
                  />
              </div>
              <div className='flex justify-start items-center'>
                <pre className='pr2 black'>Employee Type  </pre>
                <TextField
                  select
                  variant='outlined'
                  name='type'
                  className='w-100'
                  onChange={handleChange}
                  value={data.type||""}
                  // {...(errors.shirt_type && { error: true, helperText: errors.shirt_type })}
                  size="small"
                >
                  {
                    EmployeeType.map((type) => (
                      <MenuItem key={type.value} value={type.value} sx={{
                        "& li": {
                          backgroundColor: "white",
                        },
                        "&:hover": {
                          backgroundColor: "#9966cb",
                        },
                        "&.Mui-focusVisible": {
                          backgroundColor: "#9966cb",
                        }
                      }}>
                        {type.name}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </div>
              <div className='flex justify-start items-center'>
                <pre className='pr2 black'>Employee Wage</pre>
                <TextField
                  select
                  variant='outlined'
                  name='wages_type'
                  className='w-100'
                  onChange={handleChange}
                  value={data.wages_type||""}
                  // {...(errors.shirt_type && { error: true, helperText: errors.shirt_type })}
                  size="small"
                >
                  {
                    WagesType.map((type) => (
                      <MenuItem key={type.value} value={type.value} sx={{
                        "& li": {
                          backgroundColor: "white",
                        },
                        "&:hover": {
                          backgroundColor: "#9966cb",
                        },
                        "&.Mui-focusVisible": {
                          backgroundColor: "#9966cb",
                        }
                      }}>
                        {type.name}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </div>
              </Grid>
              <Grid item className='ma3'>
                <Avatar variant="rounded" sx={{ background: "#19A974", height: 175, width: 175 }}>
                  <PersonAddIcon className="center" sx={{ fontSize: 100 }} />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <div className='flex justify-start items-center ma3'>
              <pre className='pr2 black'>Enter Address    </pre>
              <TextField
                variant='outlined'
                name='address'
                value={data.address ||""}
                onChange={handleChange}
                // {...(errors.address && { error: true, helperText: errors.address })}
                className='w-100'
              />
            </div>
          </Grid>
          <Grid item xs>
            <div className='flex justify-center center ma3'>
              <button
                className='button-border pointer tc ma2 bg-white ba bw1 dim dib w5 pa2 br2 b'
                // onClick={handleClick}
              >{newEmployee ? 'Create Employee' : 'Update Employee'} </button>
              <button
                className='button-border pointer tc ma2 bg-dark-green b--black light-gray ba bw1 dim dib w5 pa2 br2 b'
                onClick={handleReset}
              >Reset</button>
            </div>
          </Grid>
        </Grid>*/}
      </div >
    )
}
