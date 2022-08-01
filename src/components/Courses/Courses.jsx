import React, { useContext, useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
// import { mockedAuthorsList, mockedCoursesList } from '../../mocks/mock-card';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import './Courses.css';
import Context from '../../context/context';
import { useNavigate } from 'react-router-dom';

function Courses() {
	const { authorsList, coursesList } = useContext(Context);
	const [filter, setFilter] = useState('');
	const navigate = useNavigate();

	function getFilter(value) {
		setFilter(value);
	}

	const courses = coursesList
		.filter(
			(course) =>
				course.id.toLowerCase().includes(filter.toLowerCase()) ||
				course.title.toLowerCase().includes(filter.toLowerCase())
		)
		.map((course, index) => (
			<li key={index}>
				<CourseCard data={course} authInfo={authorsList} />
			</li>
		));

	return (
		<div>
			<div className='courses-head'>
				<SearchBar getFilter={getFilter} />
				<Button
					className={'mr20'}
					buttonText='Add new course'
					onClick={() => navigate('/courses/add')}
				/>
			</div>
			<ul className='courses-list'>{courses}</ul>
		</div>
	);
}

export default Courses;
