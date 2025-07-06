import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../ProductContext';

const SupplierTableForm = () => {
	const [suppliers, setSuppliers] = useContext(ProductContext);

	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/supplier')
			.then((res) => {
				return res.json();
			})
			.then((results) => {
				setSuppliers({ data: [...results.data] });
			});
	}, []);
	return (
		<div className='px-5 h-screen bg-gray-100'>
			<h1 className='text-gray-800 text-2xl font-bold py-5 uppercase'>
				Supplier Data Information
			</h1>
			<div className='overflow-auto'>
				<table className='shadow-2xl border-2 border-gray-800 w-full'>
					<thead className='bg-gray-800 text-white text-left'>
						<tr>
							<th className='p-3'>ID</th>
							<th className='py-3'>Name</th>
							<th className='py-3'>Email</th>
							<th className='py-3'>Phone</th>
							<th className='py-3'>Company</th>
							<th className='py-3'>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-800 '>
						{suppliers.data.map((item, index) => (
							<tr className='text-left cursor-pointer' key={index}>
								<td className='p-3 pr-6 whitespace-nowrap'>{item.id}</td>
								<td className='py-3 pr-6 whitespace-nowrap'>{item.name}</td>
								<td className='py-3 pr-6 whitespace-nowrap'>{item.email}</td>
								<td className='py-3 pr-6 whitespace-nowrap'>{item.phone}</td>
								
								<td className='py-3 pr-6 whitespace-nowrap'>{item.company}</td>
								<td className='py-3 pr-6 whitespace-nowrap'>
									<span className='p-1.5 text-xs font-medium tracking-wider text-yellow-800 bg-yellow-200 rounded-lx bg-opacity-50'>
										supplier
									</span>
									<span className='p-1.5 text-xs m-2 font-medium tracking-wider text-blue-800 bg-blue-200 rounded-lx bg-opacity-50'>
										update
									</span>
									<span className='p-1.5 text-xs font-medium tracking-wider text-red-800 bg-red-200 rounded-lx bg-opacity-50'>
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

export default SupplierTableForm;
