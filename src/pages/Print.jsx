import React, { useEffect } from 'react';
import PrintJobData from '../components/PrintTemplate/PrintJobDataTemplate';
import PrintReceipt from '../components/PrintTemplate/PrintReceiptTemplate';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
// import IosShareIcon from '@mui/icons-material/IosShare';
import { jobData as InitialValues } from '../utils/Data/InitialValues'
// import '../styles/dashboard.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { sendRequest } from '../utils/Helpers/HelpersMethod';
import { useSearchParams } from 'react-router-dom';
import { CssTextField, MenuItemStyle as MenuStyle } from '../components/FormElements/TextfieldForm';
import { MenuItem } from '@mui/material';

export default function Print() {
  const [queryParameters] = useSearchParams()
  const [jobData, setJobData] = React.useState({});
  const [PantData, setPantData] = React.useState({});
  const [ShirtData, setShirtData] = React.useState({});
  const [customerData, setCustomerData] = React.useState({});
  const [receipt, setReceipt] = React.useState(false);
  const [advance, setAdvance] = React.useState(0);
  const ids={
    job_id:Number(queryParameters.get("job_id")),
    c_id: Number(queryParameters.get("c_id")),
  }

  const handleChange = (e) => {
    e.preventDefault();
    setAdvance(e.target.value);
  }

  useEffect(()=>{
    sendRequest('/job/getJob','POST',{job_id:ids.job_id})
      .then(result=>{
        if(result){
          var printContents = result.data;
          // console.log(printContents);
          setJobData(printContents);
          printContents.pant_quantity === 0 ?
            setPantData(InitialValues.pant_data) :
            setPantData(printContents.pant_data);
          printContents.shirt_quantity === 0 ?
            setShirtData(InitialValues.shirt_data) :
            setShirtData(printContents.shirt_data);
        }
      })
      sendRequest('/customer/getcustomer','POST',{c_id:ids.c_id})
      .then(result=>{
        if(result){
          var printContents = result.data;
          // console.log(printContents);
          setCustomerData(printContents);
        }
      })
      // eslint-disable-next-line
  },[])

  // console.log(jobData, customerData, ShirtData, PantData)
  // console.log("ids",ids)

  const HandlePrint = (type) => {
    html2canvas(document.querySelector("#printContainer"))
      .then(async (canvas) => {
        var printImg = canvas.toDataURL('image/png');
        var pdf = new jsPDF('p', 'mm');
        type === 'Jobdata' ? pdf.addImage(printImg, 'PNG', 6, 4, 198, 95, "PrintTemplate", "NONE") : pdf.addImage(printImg, 'PNG', 4, 4, 202, 95, "PrintTemplate", "NONE");
        const data = pdf.output('bloburl');
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.src = data;
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus();
            iframe.contentWindow.print();
          }, 1);
        };
      })
  }

  const HandleSave = (type) => {
    if (type === "Jobdata") {
      html2canvas(document.querySelector("#printContainer"))
        .then(canvas => {
          var printImg = canvas.toDataURL('image/png');
          var pdf = new jsPDF('p', 'mm');
          pdf.addImage(printImg, 'PNG', 0, 4, 210, 95, "PrintTemplate", "NONE");
          pdf.save(`${jobData.job_id}.pdf`)
        })
    }
    else {
      html2canvas(document.querySelector("#printContainer"))
        .then(canvas => {
          var printImg = canvas.toDataURL('image/png');
          var pdf = new jsPDF('p', 'mm');
          pdf.addImage(printImg, 'PNG', 2, 4, 190, 86, "PrintTemplate", "NONE");
          pdf.save(`Receipt ${jobData.job_id}.pdf`)
        })
    }
  }

  const handleSelect = (e) => {
    setReceipt(e.target.value)
  }

  return (
    <div className='mt-4 mx-auto'>
      <div className='flex justify-start items-center gap-4 ml-8 my-4 lg:w-1/2 md:w-11/12'>
        <PrintIcon
          className='cursor-pointer my-2 p-1 rounded-md border-2 shadow-black shadow-md bg-white'
          titleAccess="Print Job"
          sx={{ fontSize: 40 }}
          onClick={()=>{receipt ? HandlePrint("receipt") : HandlePrint("Jobdata")}}
          />
        <SaveIcon
          className='cursor-pointer my-2 p-1 rounded-md border-2 shadow-black shadow-md bg-white'
          titleAccess="Save Job"
          sx={{ fontSize: 40 }}
          onClick={() => { receipt ? HandleSave("receipt") : HandleSave("Jobdata") }}
        />
        <CssTextField
          select
          variant='outlined'
          name='receipt'
          className='w-72'
          onChange={handleSelect}
          value={receipt}
          size="small"
        >
          <MenuItem key={0} sx={MenuStyle} value={false}>Print Job Data</MenuItem>
          <MenuItem key={1} sx={MenuStyle} value={true}>Print Receipt</MenuItem>
        </CssTextField>
        {receipt ?
          <div className='flex justify-start items-center ml3'>
            <pre className='f4-xl b'>Enter Advance  </pre>
            <CssTextField
              variant='outlined'
              name='advance'
              value={advance}
              type='number'
              size='small'
              onChange={handleChange}
              className='w-50'
              slotProps={{htmlInput:{min:0}}}
              // inputProps={{ min: 0 }} 
            />
          </div> :
          ''
        }
      </div>
      {
        receipt ?
          <PrintReceipt jobData={jobData} customerData={customerData} shirt_type={ShirtData.shirt_type} advance={advance} /> :
          <PrintJobData jobData={jobData} customerData={customerData} ShirtData={ShirtData} PantData={PantData}/>
      }
    </div>
  )
}
