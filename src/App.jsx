import React, { useState } from 'react';
import Header from './components/Header/Header';
import './App.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { mockedAuthorsList, mockedCoursesList } from './mocks/mock-card';
import Context from './context/context';

function App() {
	// const [data, setData] = useState({
	// 	authorsList: mockedAuthorsList,
	// 	coursesList: mockedCoursesList,
	// });
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [coursesList, setCoursesList] = useState(mockedCoursesList);

	const [isCreate, setIsCreate] = useState(false);

	function renderCreateCourse() {
		setIsCreate(true);
	}

	function renderCourses() {
		setIsCreate(false);
	}

	function addAuthor(author) {
		setAuthorsList((prev) => prev.concat(author));
	}

	function addCourse(course) {
		setCoursesList((prev) => prev.concat(course));
	}

	return (
		<Context.Provider value={{ addAuthor, addCourse }}>
			<div className='content'>
				<Header />
				<main className='content-main'>
					{isCreate ? (
						<CreateCourse
							renderCourses={renderCourses}
							authorsList={authorsList}
						/>
					) : (
						<Courses
							renderCreateCourse={renderCreateCourse}
							data={{ authorsList, coursesList }}
						/>
					)}
				</main>
			</div>
		</Context.Provider>
	);
}

export default App;
