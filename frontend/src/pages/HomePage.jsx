import React, { useContext } from 'react';
import { ProductContext } from '../ProductContext';
import ProductForm from './ProductForm';

const HomePage = () => {
	const [products, setProducts] = useContext(ProductContext);
	return (
		<div className='p-5 h-screen bg-gray-100'>
			<ProductForm />
		</div>
	);
};

export default HomePage;
