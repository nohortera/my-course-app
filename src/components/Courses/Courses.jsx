import React, { useContext, useEffect, useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import './Courses.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchData } from '../../store/services';
import { getCourses } from '../../store/selectors';

function Courses() {
	const [filter, setFilter] = useState('');
	const navigate = useNavigate();
	const coursesFromStore = useSelector(getCourses);

	function getFilter(value) {
		setFilter(value);
	}

	const courses = coursesFromStore
		.filter(
			(course) =>
				course.id.toLowerCase().includes(filter.toLowerCase()) ||
				course.title.toLowerCase().includes(filter.toLowerCase())
		)
		.map((course, index) => (
			<li key={index}>
				<CourseCard data={course} />
			</li>
		));

	useEffect(() => {
		if (!coursesFromStore.length) {
			fetchData();
		}
	}, []);

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
