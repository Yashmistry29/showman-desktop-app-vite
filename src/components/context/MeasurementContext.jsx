import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { sendRequest } from '../../utils/Helpers/HelpersMethod';
import {jobData as initialJobData,checked } from '../../utils/Data/InitialValues';
import { ValidateCustomer, validateDate, validatePantData, validateShirtData } from '../../utils/Validation/FormValidation';
import { toast } from 'react-toastify';
const electron = window.require('electron');


const MeasurementContext = createContext();

export const MeasurementProvider = ({ children }) => {
  const [id, setId] = useState(0);//for latestJobId
  const [jobId, setJobId] = useState(0);// for last selected Id to load shirt and pant data
  const [view, setView] = useState(false);
  const [jobSelect, setJobSelect] = useState(false);
  const [jobIds, setJobIds] = useState([]);
  const [checkedData, setCheckedData] = useState(checked);
  const [sdata, setSdata] = useState(initialJobData.shirt_data);
  const [pdata, setPdata] = useState(initialJobData.pant_data);
  const [priceData, setPriceData] = useState({});
  const [quantities, setQuantities] = useState({ shirt: initialJobData.shirt_quantity, pant: initialJobData.pant_quantity });
  const [customerData, setCustomerData] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [update,setUpdate]=useState(false);
  const [returnDate, setReturnDate] = useState(initialJobData.returnDate);
  
  const [errors, setErrors] = useState({ shirt: {}, pant: {}, date: {}, customer: {} });
  const [names, setNames] = useState([]);

  const totalPrice= useMemo(() => {
    let total = 0;
    if (checkedData.pant) total += Number(pdata.price) * quantities.pant;
    if (checkedData.shirt) total += Number(sdata.price) * quantities.shirt;
    return total;
  }, [checkedData.pant, checkedData.shirt, pdata.price, quantities.pant, quantities.shirt, sdata.price]);

  const ResetData = () => {
    // console.log("Resetting Data");
    setView(false);
    setNames([]);
    setJobId(0);
    setJobSelect(false);
    setJobIds([]);
    setCheckedData(checked);
    setSdata(initialJobData.shirt_data);
    setPdata(initialJobData.pant_data);
    setQuantities({ shirt: initialJobData.shirt_quantity, pant: initialJobData.pant_quantity });
    setCustomerData({});
    setSelectedCustomer(null);
    setReturnDate(initialJobData.returnDate);
    getLatestJobId();
    loadCustomers();
  }

  const prepareJobData = () => {
    return {
      job_id: id,
      shirt_quantity: checkedData.shirt?quantities.shirt:0,
      pant_quantity: checkedData.pant?quantities.pant:0,
      createdAt: new Date(),
      returnDate: new Date(returnDate),
      totalPrice: 0
    }
  };

  const submitData = async () => {
    // console.log(prepareJobData());
    const data = prepareJobData();

    const newErrors = { shirt: {}, pant: {}, date: {}, customer: {} };
    var isValidCustomer, isValidPant, isValidShirt

    if (checkedData.pant) {
      const pantErrors = validatePantData(pdata);
      isValidPant = Object.keys(pantErrors).length === 0
      newErrors.pant = pantErrors
      data.totalPrice += Number(pdata.price) * data.pant_quantity;
      data["pant_data"] = pdata;
    }

    if (checkedData.shirt) {
      const shirtErrors = validateShirtData(sdata);
      isValidShirt = Object.keys(shirtErrors).length === 0
      newErrors.shirt = shirtErrors
      data.totalPrice += Number(sdata.price) * data.pant_quantity;
      data["shirt_data"] = sdata;
    }

    const dateErrors = validateDate(data.createdAt, data.returnDate);
    const isValidDate = Object.keys(dateErrors).length === 0
    newErrors.date = dateErrors

    const customerError = ValidateCustomer(customerData)
    isValidCustomer = Object.keys(customerError).length === 0
    newErrors.customer = customerError

    setErrors(newErrors)

    console.log(data, newErrors, isValidCustomer, isValidPant, isValidShirt, isValidDate);

    if ((isValidPant || isValidShirt) && isValidDate && isValidCustomer) {
      var route = '/customer/create';
      var c_id = (view) ? { data: customerData.c_id } : await sendRequest(route, 'POST', customerData)
      console.log(c_id)
      console.log(route, data);
      route = update ? '/job/updateJob' : '/job/createJob';
      var res = await sendRequest(route, 'POST', { c_id: c_id.data, jobData: data })
      console.log(res)
      if (res.success) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
        ResetData();
        electron.ipcRenderer.send('jobDetails', ({ job_id: data.job_id, c_id: customerData.c_id }));
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "colored",
        });
      }
    }
  }
  
  const getLatestJobId = async () => {
    try {
      const res = await sendRequest("/job/getId", "POST");
      if (res.success) setId(res.message);
    } catch (err) {
      console.log(err, "Error getting latest JobId");
    }
  }

  const loadCustomers = async () => {
    try {
      const res = await sendRequest("/customer/getnamelist", "POST");
      if (res.success) {
        // console.log(res.data);
        setNames(res.data);
      }
    } catch (err) {
      console.log(err, "error loading customerList");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getLatestJobId();
      await loadCustomers();
    };
    fetchData();
  }, [])

  useEffect(() => {
    sendRequest("/price/getprice", "POST")
      .then((res) => {
        const price = res.data;
        sdata["price"] = price.shirt_price;
        pdata["price"] = price.pant_price;
        setPriceData({ shirt: res.data.shirt_price, pant: res.data.pant_price })
      }).catch((err) => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <MeasurementContext.Provider value={{
      id, setId,
      jobId, setJobId,
      names, setNames,
      customerData, setCustomerData,
      sdata, setSdata,
      pdata, setPdata,
      view, setView,
      selectedCustomer, setSelectedCustomer,
      jobSelect, setJobSelect,
      errors, setErrors,
      jobIds, setJobIds,
      returnDate, setReturnDate,
      checkedData, setCheckedData,
      quantities, setQuantities,
      update, setUpdate,
      priceData, setPriceData,
      ResetData,
      initialJobData,
      totalPrice,
      submitData
    }}>
      {children}
    </MeasurementContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMeasurement =()=>useContext(MeasurementContext);