import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import ProductTable from '../components/ProductTable';

const RunApp = () => {
	const [products, setProducts] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		quantity: '',
		sold_quantity: '',
		price: '',
		revenue: '',
		supplier: '',
	});

	const fetchProducts = async () => {
		const response = await api.get('/api/product');
		setProducts(response.data);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handeInputChange = (event) => {
		const value =
			event.target.type === 'checked'
				? event.target.checked
				: event.target.value;
		setFormData({
			...FormData,
			[event.target.name]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		await api.post('/api/product', formData);
		fetchProducts();
		setProducts({
			name: '',
			quantity: '',
			sold_quantity: '',
			price: '',
			revenue: '',
			supplier: '',
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
					onSubmit={handleFormSubmit}
					className='flex flex-col md:w-2xl gap-1  bg-white shadow-lg p-2 md:p-8 border rounded-md'>
					<h1 className='text-2xl py-4 font-medium'>Product Form</h1>
					<label className='text-gray-700 font-medium' htmlFor='name'>
						Name
					</label>
					<input
						onChange={handeInputChange}
						value={formData.name}
						className='border rounded-md text-black'
						type='text'
						name='name'
						id='name'
					/>

					<label className='text-gray-700 font-medium' htmlFor='quantity'>
						Quantity
					</label>
					<input
						onChange={handeInputChange}
						value={formData.quantity}
						className='border rounded-md text-black'
						type='number'
						name='quantity'
						id='quantity'
					/>

					<label className='text-gray-700 font-medium' htmlFor='soldProduct'>
						Sold Product
					</label>
					<input
						onChange={handeInputChange}
						value={formData.sold_quantity}
						className='border rounded-md text-black'
						type='number'
						name='soldProduct'
						id='soldProduct'
					/>

					<label className='text-gray-700 font-medium ' htmlFor='price'>
						Price
					</label>
					<input
						onChange={handeInputChange}
						value={formData.price}
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
						onChange={handeInputChange}
						value={formData.revenue}
						type='number'
						name='revenue'
						id='revenue'
					/>
					<label className='text-gray-700 font-medium' htmlFor='supplier'>
						Supplier
					</label>
					<input
						onChange={handeInputChange}
						value={formData.supplier}
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

export default RunApp;
