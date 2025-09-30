import React, { useEffect } from 'react'
import { CssTextField as TextField } from '../FormElements/TextfieldForm'
import { sendRequest } from '../../utils/Helpers/HelpersMethod'
import { useMeasurement } from '../context/MeasurementContext'


function CustomerDataDisplay() {
	const { customerData, setCustomerData, view, errors } = useMeasurement()

	const c_errors = errors.customer;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCustomerData({ ...customerData, [name]: value });
	}

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
								error={Boolean(c_errors.name)}
								helperText={c_errors.name}
									className='w-full'
								/>
							<pre className='font-medium pr-2'>{`\tCustomer Id:  #${customerData.c_id}`}</pre>
							</div>
							<div className='flex justify-start items-center'>
							<pre className='font-medium pr-2'>Address    </pre>
								<TextField
									variant='outlined'
									name='address'
								size='small'
								margin='none'
									value={customerData.address ?? ""}
									onChange={handleChange}
								error={Boolean(c_errors.address)}
								helperText={c_errors.address}
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
							</div>
						</div>
				}

			</fieldset>
	)
}

export default CustomerDataDisplay