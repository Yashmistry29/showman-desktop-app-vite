import React, {
  useState,
  useEffect
} from "react";
import { CssTextField } from "../components/FormElements/TextfieldForm";
import { price as InitialValues } from "../utils/Data/InitialValues";
import { toast, ToastContainer } from 'react-toastify';
import { sendRequest } from "../utils/Helpers/HelpersMethod";
import '../style/custom.css';


function Price() {
  const [currentPrice, setCurrentPrice] = useState(InitialValues);
  const [newPrice, setNewPrice] = useState(InitialValues);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewPrice({ ...newPrice, [name]: value });
  }

  const handleSubmit = () => {
    sendRequest('/price/editprice', 'POST', newPrice)
      .then((res) => {
        if (res.success) {
          toast.success(res.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
          });
        }
      })
  }

  useEffect(() => {
    sendRequest("/price/getprice", "POST")
      .then((res) => {
        const price = res.data;
        setCurrentPrice({ ...price });
        setNewPrice({ ...price });
      }).catch((err) => {
        console.log(err);
      })  
  }, [])

  console.log(currentPrice, newPrice)

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="p-6 font">
        <fieldset className='border-3 px-2 py-4 border-dashed mb-8'>
          <legend className='px-1 font-bold'>Current Price</legend>
          <pre className='font-semibold pb-2'>{`Pant Price : ${currentPrice.pant_price === undefined ? "" : currentPrice.pant_price}`}&#8377;</pre>
          <pre className='font-semibold'>{`Shirt Price : ${currentPrice.shirt_price === undefined ? "" : currentPrice.shirt_price}`}&#8377;</pre>
        </fieldset>
        <fieldset className='border-3 px-2 py-4 border-dashed'>
          <legend className='px-1 font-bold'>New Price</legend>
          <div className='flex justify-start items-center pb-2'>
            <pre className='font-semibold'>Pant Price </pre>
            <CssTextField
              variant='outlined'
              name='pant_price'
              className='w-50'
              type="number"
              size="small"
              onChange={handleChange}
              value={newPrice.pant_price}
            />
          </div>
          <div className='flex justify-start items-center pb-2'>
            <pre className='font-semibold'>Shirt Price </pre>
            <CssTextField
              variant='outlined'
              name='shirt_price'
              className='w-50'
              type="number"
              size="small"
              onChange={handleChange}
              value={newPrice.shirt_price}
            />
          </div>
        </fieldset>
        <div className="flex justify-center m-4">
          <button
            // className='button-border link pointer tc bg-dark-blue white b--black ba dim dib w4 pa2 br2'
            className='border-2 cursor-pointer text-white bg-blue-900 border-black w-1/2 py-2 rounded-md shadow-2xl'
            onClick={handleSubmit}
          >Submit</button>
        </div>
      </div>
    </React.Fragment >
  )
}

export default Price