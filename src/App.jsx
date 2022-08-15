import React, { Fragment, useEffect } from 'react';
import Header from './components/Header/Header';
import './App.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/selectors';
import { loginUser } from './store/user/actionCreators';

function App() {
	const { isAuth } = useSelector(getUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function authCheck() {
		const storage = window.localStorage;
		if (storage.getItem('Bearer')) {
			dispatch(
				loginUser({
					name: storage.getItem('user'),
					email: storage.getItem('email'),
					token: `Bearer ${storage.getItem('Bearer')}`,
				})
			);
		}
	}

	useEffect(() => {
		authCheck();
		isAuth ? navigate('courses') : navigate('login');
	}, [isAuth]);

	return (
		<Fragment>
			<div className='content'>
				<Header isAuth={isAuth} />
				<main className='content-main'>
					<Routes>
						<Route path='courses' element={<Courses />} />
						<Route path='courses/add' element={<CreateCourse />} />
						<Route path='registration' element={<Registration />} />
						<Route path='login' element={<Login />} />
						<Route path='courses/:id' element={<CourseInfo />} />
					</Routes>
				</main>
			</div>
		</Fragment>
	);
}

export default App;
