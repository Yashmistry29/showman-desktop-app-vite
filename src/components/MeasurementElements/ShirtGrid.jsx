import React from 'react'
import { Grid, IconButton, MenuItem } from '@mui/material';
import { Shirt_type, Pocket_Strip } from '../../utils/Data/InitialValues';
import { CssTextField } from '../FormElements/TextfieldForm';
import { Edit, Done, IndeterminateCheckBox, AddBox } from '@mui/icons-material';
import { useMeasurement } from '../context/MeasurementContext';

const ShirtGrid = () => {

	const { sdata, setSdata, quantities, setQuantities,errors,checkedData } = useMeasurement();



	const [priceChange, setPriceChange] = React.useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSdata({ ...sdata, [name]: value });
	}

	// console.log(sdata);

	const increaseQuantity = () => {
		setQuantities(prev => ({
			shirt: prev.shirt+1,
			pant: prev.pant
		}));
	}

	const decreaseQuantity = () => {
		setQuantities((prev) => ({
			pant: prev.pant,
			shirt: prev.shirt > 1 ? prev.shirt - 1 : 1
		}));
	}

	return (
		<div className='grid md:grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto'>
			<div className='flex flex-col gap-2 py-2 my-auto'>
				<div className='flex justify-start items-center w-5/6'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Type\t\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						select
						variant='outlined'
						name='shirt_type'
						fullWidth
						size="small"
						onChange={handleChange}
						value={sdata.shirt_type}
						{...(errors.shirt_type && { error: true, helperText: errors.shirt_type })}
					>
						{
							Shirt_type.map((type) => (
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
					</CssTextField>
				</div>
				<div className='flex justify-start items-center w-5/6'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`} >{`Length\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						variant='outlined'
						name='s_length'
						fullWidth
						size="small"
						onChange={handleChange}
						{...(errors.s_length && { error: true, helperText: errors.s_length })}
						value={sdata.s_length}
					/>
				</div>
				<div className='flex justify-start items-center w-5/6'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Shoulder\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						variant='outlined'
						name='shoulder'
						fullWidth
						size="small"
						onChange={handleChange}
						{...(errors.shoulder && { error: true, helperText: errors.shoulder })}
						value={sdata.shoulder}
					/>
				</div>
				<div className='flex justify-start items-center w-5/6'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Sleeve\t\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						variant='outlined'
						name='sleeve'
						fullWidth
						size="small"
						onChange={handleChange}
						{...(errors.sleeve && { error: true, helperText: errors.sleeve })}
						value={sdata.sleeve}
					/>
				</div>
				<div className='flex justify-start items-center w-5/6'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Cuff\t\t\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						variant='outlined'
						name='cuff'
						fullWidth
						size="small"
						onChange={handleChange}
						{...(errors.cuff && { error: true, helperText: errors.cuff })}
						value={sdata.cuff}
					/>
				</div>
				<div className='flex justify-start items-center w-5/6'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Chest\t\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						variant='outlined'
						name='chest'
						fullWidth
						size="small"
						onChange={handleChange}
						{...(errors.chest && { error: true, helperText: errors.chest })}
						value={sdata.chest}
					/>
				</div>
				<div className='flex justify-start items-center w-5/6'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Waist\t\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						variant='outlined'
						name='waist'
						fullWidth
						size="small"
						onChange={handleChange}
						{...(errors.waist && { error: true, helperText: errors.waist })}
						value={sdata.waist}
					/>
				</div>
				<div className='flex justify-start items-center w-5/6'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Seat\t\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						variant='outlined'
						name='seat'
						fullWidth
						size="small"
						onChange={handleChange}
						{...(errors.seat && { error: true, helperText: errors.seat })}
						value={sdata.seat}
					/>
				</div>
			</div>
			<div className='flex flex-col gap-2 py-2'>
				<div className='flex justify-start items-center'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Pocket\t\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						variant='outlined'
						name='pocket'
						fullWidth
						size="small"
						onChange={handleChange}
						{...(errors.pocket && { error: true, helperText: errors.pocket })}
						value={sdata.pocket}
					/>
				</div>
				<div className='flex justify-start items-center'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Collar\t\t\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						variant='outlined'
						name='collar'
						fullWidth
						size="small"
						onChange={handleChange}
						{...(errors.collar && { error: true, helperText: errors.collar })}
						value={sdata.collar}
					/>
				</div>
				<div className='flex justify-start items-center'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Strip\t\t\t `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						select
						variant='outlined'
						name='strip'
						fullWidth
						size="small"
						onChange={handleChange}
						value={sdata.strip}
						{...(errors.strip && { error: true, helperText: errors.strip })}
					>
						{
							Pocket_Strip.map((type) => (
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
					</CssTextField>
				</div>
				<div className='flex items-baseline-last'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Description `}</pre>
					<CssTextField
						disabled={!checkedData.shirt}
						margin="dense"
						variant='outlined'
						name='description'
						fullWidth
						size="small"
						onChange={handleChange}
						multiline
						rows={3}
						value={sdata.description}
					/>
				</div>
				<div className='flex justify-start items-center'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Quantity\t `}</pre>
					<div className='flex justify-between items-center w-1/4'>
						<IconButton onClick={decreaseQuantity} disabled={quantities.shirt <= 1 || !checkedData.shirt}>
							<IndeterminateCheckBox className={(checkedData.shirt && quantities.shirt>1) ? 'text-black' : ''} />
						</IconButton>
						<p>{quantities.shirt}</p>
						<IconButton onClick={increaseQuantity} disabled={!checkedData.shirt}>
							<AddBox  className={ checkedData.shirt?'text-black':''} />
						</IconButton>
					</div>
				</div>
				<div className='flex justify-start items-center'>
					<pre className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} font-bold`}>{`Price\t\t\t `}</pre>
					{
						priceChange ?
							<p className={`${checkedData.shirt ? 'text-black' : 'text-stone-500'} pr-2`}>{sdata.price}&#8377;</p> :
							<div className='flex justify-center items-center gap-2'>
								<CssTextField
									disabled={!checkedData.shirt}
									variant='outlined'
									name='price'
									fullWidth
									size="small"
									value={sdata.price}
									onChange={handleChange}
								/>
								<Done
									className={`${checkedData.shirt ? 'cursor-pointer' : 'text-stone-500'}`}
									fontSize="small"
									onClick={() => { setPriceChange(true) }}
								/>
							</div>
					}
					{
						checkedData.shirt ? <Edit
							className={`${checkedData.shirt ? 'black link pointer' : 'dark-gray'} ${priceChange ? "" : "invisible"} pa1`}
							fontSize="small"
							onClick={() => { setPriceChange(false) }}
						/> : ""
					}
				</div>
			</div>
		</div>
	)
}

export default ShirtGrid