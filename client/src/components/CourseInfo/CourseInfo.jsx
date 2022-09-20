import React from 'react';
import preformattedDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';
import { useParams, Link } from 'react-router-dom';
import './CourseInfo.css';
import { useSelector } from 'react-redux';

function CourseInfo() {
	const { id } = useParams();
	const { courses, authors } = useSelector((state) => state);
	const course = courses.find((course) => course.id === id);
	const courseAuthors = [];
	course.authors.forEach((id) => {
		courseAuthors.push(authors.find((author) => author.id === id));
	});

	return (
		<div className='course-info'>
			<Link className='course-info__back-link' to='/courses'>
				&lt; Back to courses
			</Link>
			<h1 className='course-info__header'>{course.title}</h1>
			<div className='course-info__description'>
				<p>{course.description}</p>
				<div>
					<p>
						<strong>ID:</strong> {id}
					</p>
					<p>
						<strong>Duration:</strong> {preformattedDuration(course.duration)}{' '}
						hours
					</p>
					<p>
						<strong>Created:</strong> {dateGenerator(course.creationDate)}
					</p>
					<div>
						<h4 className='course-info__description_authors-header'>
							Authors:
						</h4>
						<ul>
							{courseAuthors.map((author) => (
								<li key={author.id}>{author.name}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseInfo;
