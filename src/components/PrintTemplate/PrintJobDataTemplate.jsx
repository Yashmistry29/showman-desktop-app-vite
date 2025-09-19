import React from 'react'
// import { Table, TableBody, TableCell, TableRow, TableContainer, Box, Paper } from '@mui/material'

function PrintTemplate({ jobData, customerData, ShirtData, PantData}) {
  const createdAt = new Date();
  const returnDate = new Date(jobData.returnDate);
  returnDate.setDate(returnDate.getDate() - 1);

  return (
    <div id="printContainer">
      <table className='my-3 w-full'>
        <tbody >
          <tr >
            <td colSpan={2}>
              <div className='font'>
                <pre className='font-bold lg:text-3xl md:text-2xl ml-5'>Showman Tailors</pre>
              </div>
            </td>
            <td colSpan={2} className="font1 px-4 py-2">
              <pre className='font-semibold lg:text-3xl md:text-lg'>{`Job Date    : ${createdAt.getDate() + '-' + Number(createdAt.getUTCMonth() + 1) + '-' + createdAt.getFullYear()}`}</pre>
              <pre className='font-semibold lg:text-3xl md:text-lg'>{`Customer Id : ${customerData.c_id}`}</pre>
            </td>
          </tr>
          <tr>
            <td className='pv3 font2' colSpan={2}>
              <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2'>
              <div className='w-full p-4'>
                <pre className='lg:text-3xl md:text-lg my-2 font-semibold'>{`પેન્ટ\t\t : ${jobData.pant_quantity}`}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`લંબાઈ\t : `}</span>{PantData === undefined ? "" : PantData.p_length}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`કમર\t\t : `}</span>{PantData === undefined ? "" : PantData.waist}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`ઝોલો\t : `}</span>{PantData === undefined ? "" : PantData.jholo}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`સીટ\t\t : `}</span>{PantData === undefined ? "" : PantData.seat}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`જાંઘ\t\t : `}</span>{PantData === undefined ? "" : PantData.thighs}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`ઘુંટણ\t : `}</span>{PantData === undefined ? "" : PantData.knee}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`મોરી\t\t : `}</span>{PantData === undefined ? "" : PantData.bottom}</pre>
              </div>
                <div className='w-full p-4'>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`બેલ્ટ\t     : `}</span>{PantData === undefined ? "" : PantData.belt_type}</pre>
                  <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`પોકેટ\t     : `}</span>{PantData === undefined ? "" : PantData.pocket_type}</pre>
                  <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`ચીપટી\t     : `}</span>{PantData === undefined ? "" : PantData.chipti}</pre>
                  <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`બેક પોકેટ : `}</span>{PantData === undefined ? "" : PantData.back_pocket}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`વિગત \n`}</span></pre>
                {PantData===undefined || PantData.description!=="" ?<div className='mx-0 my-4 py-8 border-2 border-dashed'>
                    <p className='lg:text-3xl md:text-lg'>{PantData === undefined ? "" : PantData.description}</p>
                </div>:""}
              </div>
              </div>
            </td>
            <td className='pv3 font2' colSpan={2}>
              <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2'>
                <div className='w-full p-4'>
                  <pre className='lg:text-3xl md:text-lg my-2 font-semibold'>{`${ShirtData.shirt_type} : ${jobData.shirt_quantity}`}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`લંબાઈ : `}</span>{ShirtData === undefined ? "" : ShirtData.s_length}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`સોલ્ડર : `}</span>{ShirtData === undefined ? "" : ShirtData.shoulder}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`બાંય\t: `}</span>{ShirtData === undefined ? "" : ShirtData.sleeve}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`કફ\t\t: `}</span>{ShirtData === undefined ? "" : ShirtData.cuff}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`છાતી   : `}</span>{ShirtData === undefined ? "" : ShirtData.chest}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`કમર    : `}</span>{ShirtData === undefined ? "" : ShirtData.waist}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`સીટ     : `}</span>{ShirtData === undefined ? "" : ShirtData.seat}</pre>
              </div>
                <div className='w-full p-4'>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`કોલર : `}</span>{ShirtData === undefined ? "" : ShirtData.collar}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`પોકેટ : `}</span>{ShirtData === undefined ? "" : ShirtData.pocket}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`પટ્ટી    : `}</span>{ShirtData === undefined ? "" : ShirtData.strip === 'in' ? 'અંદર' : ShirtData.strip === "out" ? 'આગળ' : ShirtData.strip}</pre>
                <pre className='lg:text-3xl md:text-lg my-2'><span className="font-semibold">{`વિગત \n`}</span></pre>
                  {ShirtData === undefined || ShirtData.description !== "" ? <div className='mx-0 my-4 py-8 border-2 border-dashed'>
                    <p className='lg:text-3xl md:text-lg'>{ShirtData === undefined ? "" : ShirtData.description}</p>
                  </div> : ""}
              </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="px-4 py-1 font1">
              <pre className='lg:text-3xl md:text-lg font-semibold'>{`Name\t: ${customerData.name}`}</pre>
              <pre className='lg:text-3xl md:text-lg font-semibold'>{`Address\t: ${customerData.address}`}</pre>
              <pre className='lg:text-3xl md:text-lg font-semibold'>{`Contact\t: ${customerData.phone}, ${customerData.phone2}`}</pre>
            </td>
            <td colSpan={2} className="px-4 font1">
              <pre className='lg:text-3xl md:text-lg font-semibold'>{`JobNumber     : ${jobData.job_id}`}</pre>
              <pre className='lg:text-3xl md:text-lg font-semibold'>{`Delivery Date : ${returnDate.getDate() + '-' + Number(returnDate.getUTCMonth() + 1) + '-' + returnDate.getFullYear()}`}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PrintTemplate