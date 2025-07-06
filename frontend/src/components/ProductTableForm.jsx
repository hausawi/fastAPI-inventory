import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../ProductContext';

const ProductTableForm = () => {
	const [products, setProducts] = useContext(ProductContext);

	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/product')
			.then((res) => {
				return res.json();
			})
			.then((results) => {
				setProducts({ data: [...results.data] });
			});
	}, []);

	const handleDelete = async (id) => {
		fetch('http://127.0.0.1:8000/product/' + id, {
			method: 'DELETE',
			headers: {
				accept: 'appliction/json'
			}
		}).then(res => {
			return res.json()
		}).then(result => {
			if (result.status === 'ok') {
				const filteredProducts = products.data.filter((product) => product.id !== id)
				setProducts({ date: [...filteredProducts] })
				alert('Product deleted')
			} else {
				alert('Product deletion failed')
			}
		})
		
	}
	return (
		<div className='px-5 h-screen bg-gray-100'>
			<h1 className='text-gray-800 text-2xl font-bold py-5 uppercase'>
				Product Data Information
			</h1>
			<div className='overflow-auto'>
				<table className='shadow-2xl border-2 border-gray-800 w-full'>
					<thead className='bg-gray-800 text-white text-left'>
						<tr>
							<th className='p-3'>#</th>
							<th className='py-3'>Name</th>
							<th className='py-3'>Quantity</th>
							<th className='py-3'>Sold quantity</th>
							<th className='py-3'>Price</th>
							<th className='py-3'>Revenue</th>
							<th className='py-3'>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-800 '>
						{products.data.map((item, index) => (
							<tr className='text-left cursor-pointer' key={index}>
								<td className='p-3 pr-6 whitespace-nowrap'>{item.id}</td>
								<td className='py-3 pr-6 whitespace-nowrap'>{item.name}</td>
								<td className='py-3 pr-6 whitespace-nowrap'>{item.quantity}</td>
								<td className='py-3 pr-6 whitespace-nowrap'>
									{item.sold_quantity}
								</td>
								<td className='py-3 pr-6 whitespace-nowrap'>{item.price}</td>
								<td className='py-3 pr-6 whitespace-nowrap'>{item.revenue}</td>
								<td className='py-3 pr-6 whitespace-nowrap '>
									<span className='p-1.5 text-xs font-medium tracking-wider text-yellow-800 bg-yellow-200 rounded-lx bg-opacity-50'>
										supplier
									</span>
									<span className='p-1.5 text-xs m-1 font-medium tracking-wider text-blue-800 bg-blue-200 rounded-lx bg-opacity-50'>
										update
									</span>
									<span onClick={()=> handleDelete(item.id)} className='p-1.5 text-xs font-medium tracking-wider text-red-800 bg-red-200 rounded-lx bg-opacity-50'>
										delete
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductTableForm;
