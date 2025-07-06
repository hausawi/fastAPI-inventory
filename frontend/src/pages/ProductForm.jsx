import React, { useState } from 'react';
import ProductTableForm from '../components/ProductTableForm';
import { Link } from 'react-router-dom';
import ProductTable from '../components/ProductTable';

const ProductForm = () => {
	const [productInfo, setProductInfo] = useState({
		ProductName: '',
		Quantity: '',
		SoldQuantity: '',
		Price: '',
		Revenue: '',
		Supplier: '',
	});

	const updateForm = (e) => {
		setProductInfo({
			...productInfo,
			[e.target.name]: e.target.value,
		});
	};
	console.log(productInfo);

	const postData = async (e) => {
		e.preventDefault();

		const url = 'http://127.0.0.1:8000/api/product/' + productInfo['Supplier'];

		const res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: { 'Content-Type': 'appliction/json' },
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				name: productInfo['ProductName'],
				quantity: productInfo['Quantity'],
				sold_quantity: productInfo['SoldQuantity'],
				price: productInfo['Price'],
				revenue: productInfo['Revenue'],
			}),
		});
		console.log(res);

		res.json().then((res) => {
			if (res.status === 'ok') {
				alert('product added successfully');
			} else {
				alert('Faild to add product');
			}
		});
		setProductInfo({
			ProductName: '',
			Quantity: '',
			SoldQuantity: '',
			Price: '',
			Revenue: '',
			Supplier: '',
		});
	};
	return (
		<>
			<div className='flex flex-col w-full justify-center pt-3 h-screen items-center bg-gray-100'>
				<Link
					to='/form'
					className='text-sx text-blue-500 cursor-pointer  text-left'>
					Go to supplier form ↠
				</Link>
				<form
					onSubmit={postData}
					className='flex flex-col md:w-2xl gap-1  bg-white shadow-lg p-2 md:p-8 border rounded-md'>
					<h1 className='text-2xl py-4 font-medium'>Product Form</h1>
					<label className='text-gray-700 font-medium' htmlFor='name'>
						Name
					</label>
					<input
						onChange={updateForm}
						value={productInfo.Name}
						className='border rounded-md text-black'
						type='text'
						name='name'
						id='name'
					/>

					<label className='text-gray-700 font-medium' htmlFor='quantity'>
						Quantity
					</label>
					<input
						onChange={updateForm}
						value={productInfo.Quantity}
						className='border rounded-md text-black'
						type='number'
						name='quantity'
						id='quantity'
					/>

					<label className='text-gray-700 font-medium' htmlFor='soldProduct'>
						Sold Product
					</label>
					<input
						onChange={updateForm}
						value={productInfo.SoldProduct}
						className='border rounded-md text-black'
						type='number'
						name='soldProduct'
						id='soldProduct'
					/>

					<label className='text-gray-700 font-medium ' htmlFor='price'>
						Price
					</label>
					<input
						onChange={updateForm}
						value={productInfo.Price}
						className='border rounded-md text-black'
						type='number'
						name='price'
						id='price'
					/>
					<label className='text-gray-700 font-medium ' htmlFor='revenue'>
						Revenue
					</label>
					<input
						className='border rounded-md text-semibold text-black'
						onChange={updateForm}
						value={productInfo.Revenue}
						type='number'
						name='revenue'
						id='revenue'
					/>
					<label className='text-gray-700 font-medium' htmlFor='supplier'>
						Supplier
					</label>
					<input
						onChange={updateForm}
						value={productInfo.Supplier}
						className='border rounded-md text-black'
						type='number'
						name='supplier'
						id='supplier'
					/>

					<button
						className='bg-blue-700 text-white hover:bg-gray-500 p-2 my-4'
						type='submit'>
						Submit
					</button>
				</form>
			</div>
			<ProductTable />
		</>
	);
};

export default ProductForm;
