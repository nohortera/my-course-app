import React, { useEffect, useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import './Courses.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchData } from '../../store/services';
import { getCourses, getUser } from '../../store/selectors';
import { ADMIN } from '../../store/user/roles';

function Courses() {
	const [filter, setFilter] = useState('');
	const navigate = useNavigate();
	const coursesFromStore = useSelector(getCourses);
	const user = useSelector(getUser);

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
		console.log('render courses');
	}, []);

	return (
		<div>
			<div className='courses-head'>
				<SearchBar getFilter={getFilter} />
				{user.role === ADMIN && (
					<Button
						className={'mr20'}
						buttonText='Add new course'
						onClick={() => navigate('/courses/add')}
					/>
				)}
			</div>
			<ul className='courses-list'>{courses}</ul>
		</div>
	);
}

export default Courses;
