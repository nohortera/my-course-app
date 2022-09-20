import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import './App.css';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/selectors';
import { PrivateRouter } from './components/PrivateRouter/PrivateRouter';
import { thunkCheckCurrentUser } from './store/user/thunk';

function App() {
	const { isAuth } = useSelector(getUser);
	const dispatch = useDispatch();

	function authCheck() {
		const storage = window.localStorage;
		if (storage.getItem('token')) {
			const token = storage.getItem('token');
			dispatch(thunkCheckCurrentUser(token));
		}
	}

	useEffect(() => {
		authCheck();
	}, []);

	return (
		<>
			<div className='content'>
				<Header />
				<main className='content-main'>
					<Routes>
						<Route
							path='courses'
							element={
								isAuth ? <Courses /> : <Navigate to='/login' replace={true} />
							}
						/>
						<Route
							path='courses/add'
							element={
								<PrivateRouter>
									<CourseForm />
								</PrivateRouter>
							}
						/>
						<Route path='courses/:id' element={<CourseInfo />} />
						<Route
							path='courses/update/:id'
							element={
								<PrivateRouter>
									<CourseForm />
								</PrivateRouter>
							}
						/>
						<Route path='registration' element={<Registration />} />
						<Route path='login' element={<Login />} />
						<Route
							path='*'
							element={<Navigate to='/courses' replace={true} />}
						/>
					</Routes>
				</main>
			</div>
		</>
	);
}

export default App;
