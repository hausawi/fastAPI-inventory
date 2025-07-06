import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserForm from './pages/UserForm';
import ProductForm from './pages/ProductForm';
import RunApp from './pages/RunApp';

function App() {
	return (
		<>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path='/form' element={<UserForm />} />
				<Route path='/product' element={<ProductForm />} />
				<Route path='/app' element={<RunApp />} />
			</Routes>
		</>
	);
}

export default App;
