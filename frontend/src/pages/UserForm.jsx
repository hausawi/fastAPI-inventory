import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SupplierTableForm from '../components/SupplierTableForm';

const UserForm = () => {
	const [supplierInfo, setSupplierInfo] = useState({
		Name: '',
		Company: '',
		Phone: '',
		Email: '',
		Supplier: '',
	});

	const updateForm = (e) => {
		setSupplierInfo({
			...supplierInfo,
			[e.target.name]: e.target.value,
		});
	};

	const postData = async (e) => {
		e.preventDefault();

		const url = 'http://localhost:8000/api/supplier';

		const res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: { 'Content-Type': 'appliction/json' },
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				name: supplierInfo['Name'],
				company: supplierInfo['Company'],
				sold_company: supplierInfo['SoldCompany'],
				phone: supplierInfo['Phone'],
				email: supplierInfo['Email'],
			}),
		});
		res.json().then((res) => {
			if (res.status === 'ok') {
				alert('Supplier added successfully');
			} else {
				alert('Faild to add a supplier');
			}
		});
		setSupplierInfo({
			Name: '',
			Company: '',
			Phone: '',
			Email: '',
			Supplier: '',
		});
	};
	return (
		<>
			<div className='flex flex-col justify-center pt-3 lg:h-screen items-center bg-gray-100'>
				<Link
					to='/'
					className='text-sx text-blue-500 cursor-pointer  text-left'>
					Go to product form ↠
				</Link>
				<form
					onSubmit={postData}
					className='flex flex-col md:w-2xl gap-1  bg-white shadow-lg p-2 md:p-8 border rounded-md'>
					<h1 className='text-2xl py-4 font-medium'>Supplier Form</h1>
					<label className='text-gray-700 font-medium' htmlFor='name'>
						Name
					</label>
					<input
						onChange={updateForm}
						value={supplierInfo.Name}
						className='border rounded-md text-black bg-white'
						placeholder='Enter supplier name'
						type='text'
						name='name'
						id='name'
					/>

					<label className='text-gray-700 font-medium' htmlFor='supplier'>
						Supplier ID
					</label>
					<input
						onChange={updateForm}
						value={supplierInfo.Supplier}
						className='border rounded-md text-black '
						placeholder='Enter supplier ID'
						type='text'
						name='supplier'
						id='supplier'
					/>

					<label className='text-gray-700 font-medium' htmlFor='company'>
						Company
					</label>
					<input
						onChange={updateForm}
						value={supplierInfo.Company}
						className='border rounded-md text-black '
						placeholder='Enter supplier company'
						type='text'
						name='company'
						id='company'
					/>

					<label className='text-gray-700 font-medium' htmlFor='phone'>
						Phone
					</label>
					<input
						onChange={updateForm}
						value={supplierInfo.Phone}
						className='border rounded-md text-black '
						placeholder='Phone number'
						type='text'
						name='phone'
						id='phone'
					/>

					<label className='text-gray-700 font-medium' htmlFor='email'>
						Email
					</label>
					<input
						onChange={updateForm}
						value={supplierInfo.Email}
						className='border rounded-md text-black '
						placeholder='Email address'
						type='email'
						name='email'
						id='email'
					/>

					<button
						className='bg-blue-700 text-white hover:bg-gray-500 p-2 my-4'
						type='submit'>
						Submit
					</button>
				</form>
			</div>
			<SupplierTableForm />
		</>
	);
};

export default UserForm;
