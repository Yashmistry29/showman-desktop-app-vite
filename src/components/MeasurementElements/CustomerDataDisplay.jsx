import React, { useEffect } from 'react'
import { CssTextField as TextField } from '../FormElements/TextfieldForm'
import { sendRequest } from '../../utils/Helpers/HelpersMethod'
import { useMeasurement } from '../context/MeasurementContext'


function CustomerDataDisplay() {
	const {customerData,setCustomerData,view,errors} = useMeasurement()

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCustomerData({ ...customerData, [name]: value });
	}

	// const handleClick = (e) => {
	// 	e.preventDefault();
	// 	console.log(customerData)
	// 	const validationErrors = ValidateCustomer(customerData);
	// 	const isValid = Object.keys(validationErrors).length === 0;
	// 	console.log(validationErrors, isValid);
	// 	setErrors(validationErrors);
	// 	if (isValid) {
	// 		console.log(customerData);
	// 		sendRequest('/customer/create', "POST", customerData)
	// 			.then((res) => {
	// 				if (res.success) {
	// 					toast.success(res.message, {
	// 						position: "top-right",
	// 						autoClose: 2000,
	// 						hideProgressBar: false,
	// 						closeOnClick: true,
	// 						pauseOnHover: true,
	// 						draggable: true,
	// 					});
	// 					setView(true)
	// 				} else {
	// 					toast.error(res.message, {
	// 						position: "top-right",
	// 						autoClose: 2000,
	// 						hideProgressBar: false,
	// 						closeOnClick: true,
	// 						pauseOnHover: true,
	// 						draggable: true,
	// 					});
	// 				}
	// 			})
	// 	} else {
	// 		console.log(errors);
	// 		toast.error("Enter Customer Details Properly");
	// 	}
	// }

	// const handleReset = () => {
	// 	setCustomerData(resetData);
	// 	setErrors({})
	// }

	useEffect(() => {
		if (customerData.c_id === null || customerData.c_id === undefined) {
			sendRequest("/customer/getid", "POST")
				.then((res) => {
					if (res.success) {
						setCustomerData({ c_id: res.message });
					}
				})
		}
	}, [customerData.c_id, setCustomerData])

	// console.log(customerData)

	return (
			<fieldset className='bg-slate-50/70 rounded-tl-2xl shadow-xl border-2'>
				<legend className='ml-4 px-2 font-bold'>Customer Details</legend>
				{
					view ?
					<div className='flex flex-col gap-4 py-4 my-auto px-8 font-medium'>
							<pre>{`Customer Id\t: ${customerData.c_id === undefined ? "" : customerData.c_id}`}</pre>
							<pre>{`Name\t\t\t\t: ${customerData.name === undefined ? "" : customerData.name}`}</pre>
							<pre>{`Mobile\t\t\t\t: ${customerData.phone === undefined ? "" : customerData.phone}\t\t\t\tMobile 2: ${customerData.phone2 === undefined ? "" : customerData.phone2}`}</pre>
							<pre>{`Address\t\t\t: ${customerData.address === undefined ? "" : customerData.address}`}</pre>
						</div>
						:
					<div className='flex flex-col gap-3 px-8 my-auto py-4'>
							<div className='flex justify-start items-center '>
							<pre className='font-medium pr-2'>Name       </pre>
								<TextField
									variant='outlined'
									autoFocus
									name='name'
								size="small"
								margin='none'
									value={customerData.name ?? ""}
									onChange={handleChange}
									error={Boolean(errors.customer.name)}
									helperText={errors.customer.name}
									className='w-full'
								/>
							<pre className='font-medium pr-2'>{`\tCustomer Id:  #${customerData.c_id}`}</pre>
							</div>
							<div className='flex justify-start items-center'>
							<pre className='font-medium pr-2'>Address    </pre>
								<TextField
									variant='outlined'
									name='address'
								size="small"
								margin='none'
									value={customerData.address ?? ""}
									onChange={handleChange}
									error={Boolean(errors.customer.address)}
									helperText={errors.customer.address}
									className='w-full'
								/>
							</div>
							<div className='flex justify-start items-center'>
							<pre className='font-medium pr-2'>Contact 1 </pre>
								<TextField
									variant='outlined'
									name='phone'
								size="small"
								margin='none'
								slotProps={{
										input: {
											maxLength: 10
										}
									}}
									value={customerData.phone ?? ""}
									onChange={handleChange}
									className='w-full'
								/>
								{/* <Done
									className='button-border b--black link pointer tc ma2 bg-green black ba bw1 dim dib w2 pa1 br2 b'
									fontSize="small"
									onClick={handleClick}
								/>
								<Reset
									className='button-border b--black link pointer tc ma2 bg-white black ba bw1 dim dib w2 pa1 br2 b'
									fontSize="small"
									onClick={handleReset}
								/> */}
							</div>
						</div>
				}

			</fieldset>
	)
}

export default CustomerDataDisplay