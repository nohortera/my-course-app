import React, { Fragment, useEffect, useRef, useState } from 'react';
import Header from './components/Header/Header';
import './App.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { mockedAuthorsList, mockedCoursesList } from './mocks/mock-card';
import Context from './context/context';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	// const isAuth = useRef(false);
	const [isAuth, setIsAuth] = useState(false);
	const navigate = useNavigate();

	function addAuthor(author) {
		setAuthorsList((prev) => prev.concat(author));
	}

	function addCourse(course) {
		setCoursesList((prev) => prev.concat(course));
	}

	function authCheck() {
		const storage = window.localStorage;
		if (storage.getItem('Bearer')) {
			// isAuth.current = true;
			setIsAuth(true);
			console.log('Checking authorization...', isAuth);
		} else {
			// isAuth.current = false;
			setIsAuth(false);
		}
	}

	useEffect(() => {
		authCheck();
		// console.log(isAuth);
		isAuth ? navigate('courses') : navigate('login');
	}, [isAuth]);

	return (
		<Fragment>
			<Context.Provider
				value={{
					addAuthor,
					addCourse,
					authorsList,
					coursesList,
					authCheck,
					isAuth,
				}}
			>
				<div className='content'>
					<Header isAuth={isAuth} />
					<main className='content-main'>
						{/*{isAuth ? <Navigate to='/courses' /> : <Navigate to='/login' />}*/}
						<Routes>
							<Route path='courses' element={<Courses />} />
							<Route path='courses/add' element={<CreateCourse />} />
							<Route path='registration' element={<Registration />} />
							<Route path='login' element={<Login />} />
							<Route path='courses/:id' element={<CourseInfo />} />
						</Routes>
					</main>
				</div>
			</Context.Provider>
		</Fragment>
	);
}

export default App;
