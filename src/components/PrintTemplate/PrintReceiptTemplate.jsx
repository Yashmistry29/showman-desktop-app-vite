import React, { useEffect } from 'react'
import { price } from '../../utils/Data/InitialValues';
import { sendRequest } from '../../utils/Helpers/HelpersMethod';

function PrintReceiptTemplate({ jobData, customerData, shirt_type, advance }) {
  const createdAt = new Date(jobData.createdAt);
  const returnDate = new Date(jobData.returnDate);
  const [cprice, setPrice] = React.useState(price)
  const [Itemprice, setItemPrice] = React.useState({
  })

  useEffect(() => {
    sendRequest("/job/getCurrentJobPrice", "POST", { job_id: jobData.job_id })
      .then((res) => {
        const result = res.message;
        setPrice(result)
        setItemPrice({
          shirt_price: jobData.shirt_quantity === 0 ? 0 : jobData.shirt_quantity * result.shirt_price,
          pant_price: jobData.pant_quantity === 0 ? 0 : jobData.pant_quantity * result.pant_price
        })
      }).catch((err) => {
        console.log(err);
      })
  }, [jobData.job_id, jobData.pant_quantity, jobData.shirt_quantity])

  // console.log(shirt_type)

  return (
    <div
      id="printContainer"
      className='flex lg:w-7/12 md:w-11/12 mx-auto'
    >
      <table className='my-6 mx-4 w-full font'>
        <tbody>
          <tr>
            <td rowSpan={2} colSpan={3}>
              <div className='text-center font'>
                <p className='lg:text-4xl md:text-lg tracking-[0.75rem] my-0'>SHOWMAN</p>
                <p className='lg:text-lg md-text-xs lg:tracking-[1.25rem] md:tracking-[0.7rem] my-2'>TAILORS</p>
              </div>
            </td>
            <td colSpan={1}>
              <p className='font-bold m-1 lg:text-base md:text-xs'>Description</p>
              </td>
            <td>
              <p className='font-bold m-1 lg:text-base md:text-xs'>Quantity</p>
            </td>
            <td>
              <p className='font-bold m-1 lg:text-base md:text-xs'>Price</p>
            </td>
            <td>
              <p className='font-bold m-1 lg:text-base md:text-xs'>Q.Price</p>
            </td>
            <td rowSpan={9}></td>
          </tr>
          <tr>
            <td rowSpan={4} colSpan={1} style={{ wordWrap: "break-word" }}>
              <p className='lg:text-base md:text-xs font-bold pb-4 pl-2 mt-0'>{jobData.pant_quantity !== 0 ? `પેન્ટ` : "-"}</p>
              <p className='lg:text-base md:text-xs font-bold pb-4 pl-2 mt-0'>{jobData.shirt_quantity !== 0 ? `${shirt_type}` : "-"}</p> 
            </td>
            <td rowSpan={4}>
              <p className='lg:text-base md:text-xs font-bold pb-4 pl-3 mt-0'>{jobData.pant_quantity !== 0 ? `${jobData.pant_quantity}` : "-"}</p>
              <p className='lg:text-base md:text-xs font-bold pb-4 pl-3 mt-0'>{jobData.shirt_quantity !== 0 ? `${jobData.shirt_quantity}` : "-"}</p>
            </td>
            <td rowSpan={4}>
              <p className='lg:text-base md:text-xs font-bold pb-4 pl-3 mt-0'>{jobData.pant_quantity !== 0 ? `${cprice.pant_price}` : '-'}</p>
              <p className='lg:text-base md:text-xs font-bold pb-4 pl-3 mt-0'>{jobData.shirt_quantity !== 0 ? `${cprice.shirt_price}` : '-'}</p>
            </td>
            <td rowSpan={4}>
              <p className='lg:text-base md:text-xs font-bold pb-4 pl-3 mt-0'>{jobData.pant_quantity !== 0 ? `${Itemprice.pant_price}` : '-'}</p>
              <p className='lg:text-base md:text-xs font-bold pb-4 pl-3 mt-0'>{jobData.shirt_quantity !== 0 ? `${Itemprice.shirt_price}` : '-'}</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={4} colSpan={3} style={{ wordWrap: "break-word" }}>
              <div className='my-4 mx-2'>
                <p className='lg:text-base md:text-xs font-bold m-1'>Name</p>
                <p className='lg:text-base md:text-xs m-1'>{`${customerData.name} (${customerData.c_id})`}</p>
                <pre className='lg:text-base md:text-xs m-1'><span className='font-bold'>Address</span>{`\t: ${customerData.address} `}</pre>
                <pre className='lg:text-base md:text-xs m-1'><span className='font-bold'>Job Id</span>{`\t: ${jobData.job_id}`}</pre>
                <pre className='lg:text-base md:text-xs m-1'><span className='font-bold'>Mobile</span>{`\t: ${customerData.phone}, ${customerData.phone2}`}</pre>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr>
            <td rowSpan={3} colSpan={3}>
              <div className='md:text-xs lg:text-base text-center my-2'>
                <p className='font-bold'>પેન્ટ શર્ટ સફારી સૂટ ના સ્પેશિયાલિસ્ટ</p>
                <p className='font-bold'>જુનગામ, મેઇન રોડ, ફોર્ટ સોનગઢ, જી. તાપી</p>
                <p className='font-bold'>Contact: 9426876500, 9913176500</p>
              </div>
            </td>
            <td colSpan={2}>
              <pre className='lg:text-base md:text-xs m-1'><span className='font-bold'>Job Date</span> {`: ${createdAt.getDate() + '/' + Number(createdAt.getUTCMonth() + 1) + '/' + createdAt.getFullYear()}`}</pre>
            </td>
            <td>
              <pre className='lg:text-[0.9em] md:text-[0.8em] font-bold m-1'>Item Total</pre>
            </td>
            <td>
              <pre className='lg:text-[0.9em] md:text-[0.8em] pl-2 '>{Itemprice.shirt_price + Itemprice.pant_price}</pre>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <pre className='lg:text-base md:text-xs m-1'><span className='font-bold'>Delivery Date</span> {`: ${returnDate.getDate() + '/' + Number(returnDate.getUTCMonth() + 1) + '/' + returnDate.getFullYear()}`}</pre>
            </td>
            <td>
              <pre className='lg:text-[0.9em] md:text-[0.8em] font-bold m-1'>Advance</pre>
            </td>
            <td>
              <pre className='lg:text-[0.9em] md:text-[0.8em] pl-2'>{advance}</pre>
            </td>
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td>
              <pre className='lg:text-[0.9em] md:text-[0.8em] font-bold m-1'>Total</pre>
            </td>
            <td>
              <pre className='lg:text-[0.9em] md:text-[0.8em] pl-2'>{Itemprice.shirt_price + Itemprice.pant_price - advance}</pre>
            </td>
          </tr>
        </tbody>
      </table>

    </div >
  )
}

export default PrintReceiptTemplate