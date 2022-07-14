import React, { useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
// import { mockedAuthorsList, mockedCoursesList } from '../../mocks/mock-card';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import './Courses.css';

function Courses(props) {
	const [filter, setFilter] = useState('');

	function getFilter(value) {
		setFilter(value);
	}

	const courses = props.data.coursesList
		.filter(
			(course) =>
				course.id.toLowerCase().includes(filter.toLowerCase()) ||
				course.title.toLowerCase().includes(filter.toLowerCase())
		)
		.map((course, index) => (
			<li key={index}>
				<CourseCard data={course} authInfo={props.data.authorsList} />
			</li>
		));

	function handleButton(e) {
		e.preventDefault();
		props.renderCreateCourse();
	}

	return (
		<div>
			<div className='courses-head'>
				<SearchBar getFilter={getFilter} />
				<Button
					className={'mr20'}
					buttonText='Add new course'
					onClick={handleButton}
				/>
			</div>
			<ul className='courses-list'>{courses}</ul>
		</div>
	);
}

export default Courses;
