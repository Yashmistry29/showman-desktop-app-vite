import React from 'react'
import { Grid, IconButton } from '@mui/material';
import { Pocket_Type, belt_type } from '../../utils/Data/InitialValues';
import { CssTextField } from '../FormElements/TextfieldForm';
import { StyledMenu as MenuItem } from '../FormElements/ListItemButton';
import { Edit, Done, AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { useMeasurement } from '../context/MeasurementContext';

const PantGrid = () => {

  const { pdata, setPdata, checkedData, quantities, setQuantities, errors } = useMeasurement();

  const [priceChange, setPriceChange] = React.useState(true);
  const pant_errors = errors.pant;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPdata({ ...pdata, [name]: value });
  }

  // console.log(pdata);

  const increaseQuantity = () => {
    setQuantities(prev => ({
      shirt: prev.shirt,
      pant: prev.pant + 1
    }));
  }

  const decreaseQuantity = () => {
    setQuantities((prev) => ({
      shirt: prev.shirt,
      pant: prev.pant > 1 ? prev.pant - 1 : 1
    }));
  }

  return (
    <div className='grid md:grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto'>
      <div className='flex flex-col gap-2 py-2 my-auto'>
        <div className='flex justify-start items-center w-5/6'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Belt\t\t `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            select
            variant='outlined'
            name='belt_type'
            fullWidth
            size='small'
            onChange={handleChange}
            value={pdata.belt_type}
            {...(pant_errors.belt_type && { error: true, helperText: pant_errors.belt_type })}
          >
            {
              belt_type.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.name}
                </MenuItem>
              ))
            }
          </CssTextField>
        </div>
        <div className='flex justify-start items-center w-5/6'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Length  `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            variant='outlined'
            name='p_length'
            fullWidth
            size='small'
            onChange={handleChange}
            value={pdata.p_length}
            {...(pant_errors.p_length && { error: true, helperText: pant_errors.p_length })}
          />
        </div>
        <div className='flex justify-start items-center w-5/6'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Waist\t `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            variant='outlined'
            name='waist'
            fullWidth
            size='small'
            onChange={handleChange}
            value={pdata.waist}
            {...(pant_errors.waist && { error: true, helperText: pant_errors.waist })}
          />
        </div>
        <div className='flex justify-start items-center w-5/6'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Jholo\t `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            variant='outlined'
            name='jholo'
            fullWidth
            size='small'
            onChange={handleChange}
            value={pdata.jholo}
            {...(pant_errors.jholo && { error: true, helperText: pant_errors.jholo })}
          />
        </div>
        <div className='flex justify-start items-center w-5/6'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Seat\t\t `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            variant='outlined'
            name='seat'
            fullWidth
            size='small'
            onChange={handleChange}
            value={pdata.seat}
            {...(pant_errors.seat && { error: true, helperText: pant_errors.seat })}
          />
        </div>
        <div className='flex justify-start items-center w-5/6'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Thighs\t `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            variant='outlined'
            name='thighs'
            fullWidth
            size='small'

            onChange={handleChange}
            value={pdata.thighs}
            {...(pant_errors.thighs && { error: true, helperText: pant_errors.thighs })}
          />
        </div>
        <div className='flex justify-start items-center w-5/6'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Knee\t `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            variant='outlined'
            name='knee'
            fullWidth
            size='small'
            onChange={handleChange}
            value={pdata.knee}
            {...(pant_errors.knee && { error: true, helperText: pant_errors.knee })}
          />
        </div>
        <div className='flex justify-start items-center w-5/6'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Bottom `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            variant='outlined'
            margin='none'
            name='bottom'
            fullWidth
            size='small'
            onChange={handleChange}
            value={pdata.bottom}
            {...(pant_errors.bottom && { error: true, helperText: pant_errors.bottom })}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 py-2'>
        <div className='flex justify-start items-center'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Pocket\t\t\t `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            select
            margin='none'
            variant='outlined'
            name='pocket_type'
            fullWidth
            onChange={handleChange}
            size="small"
            value={pdata.pocket_type}
            {...(pant_errors.pocket_type && { error: true, helperText: pant_errors.pocket_type })}
          >
            {
              Pocket_Type.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.name}
                </MenuItem>
              ))
            }
          </CssTextField>
        </div>
        <div className='flex justify-start items-center'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Chipti\t\t\t `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            variant='outlined'
            name='chipti'
            fullWidth
            size='small'
            onChange={handleChange}
            value={pdata.chipti}
            {...(pant_errors.chipti && { error: true, helperText: pant_errors.chipti })}
          />
        </div>
        <div className='flex justify-start items-center'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Back-Pocket `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            variant='outlined'
            name='back_pocket'
            fullWidth
            margin='none'
            size='small'
            onChange={handleChange}
            value={pdata.back_pocket}
            {...(pant_errors.back_pocket && { error: true, helperText: pant_errors.back_pocket })}
          />
        </div>
        <div className='flex items-baseline-last'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Description   `}</pre>
          <CssTextField
            disabled={!checkedData.pant}
            margin='none'
            variant='outlined'
            name='description'
            fullWidth
            onChange={handleChange}
            value={pdata.description}
            multiline
            size='small'
            rows="3"
          />
        </div>
        <div className='flex justify-start items-center w-5/6'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Quantity\t   `}</pre>
          <div className='flex justify-between items-center w-1/4'>
            <IconButton onClick={decreaseQuantity} disabled={quantities.pant <= 1 || !checkedData.pant}>
              <IndeterminateCheckBox className={(checkedData.pant && quantities.pant>1) ? 'text-black' : ''} />
            </IconButton>
            <p>{quantities.pant}</p>
            <IconButton onClick={increaseQuantity} disabled={!checkedData.pant}>
              <AddBox  className={ checkedData.pant?'text-black':''} />
            </IconButton>
          </div>
        </div>
        <div className='flex justify-start items-center'>
          <pre className={`${checkedData.pant ? 'text-black' : 'text-stone-500'} font-bold`}>{`Price\t\t\t `}</pre>
          {
            priceChange ?
              <p className={`${checkedData.pant ? 'black' : 'text-stone-500'} pr-2`}>{pdata.price}&#8377;</p> :
              <div className='flex justify-center items-center gap-2'>
                <CssTextField
                  disabled={!checkedData.pant}
                  variant='outlined'
                  name='price'
                  size='small'
                  fullWidth
                  value={pdata.price}
                  onChange={handleChange}
                />
                <Done
                  className={`${checkedData.pant ? 'cursor-pointer' : 'text-stone-500'}`}
                  fontSize="small"
                  onClick={() => { setPriceChange(true) }}
                />
              </div>
          }
          {
            checkedData.pant ? <Edit
              className={`${checkedData.pant ? 'black link pointer' : 'dark-gray'} ${priceChange ? "" : "invisible"} pa1`}
              fontSize="small"
              onClick={() => { setPriceChange(false) }}
            /> : ""
          }
        </div>
      </div>
    </div>
  )
}

export default PantGrid