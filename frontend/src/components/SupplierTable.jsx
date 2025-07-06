import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../ProductContext';
import SupplierTableForm from './SupplierTableForm';

const SupplierTable = () => {
	return (
		<div className='p-5 h-screen bg-gray-100'>
				<SupplierTableForm
				/>
		</div>
	);
};

export default SupplierTable;
