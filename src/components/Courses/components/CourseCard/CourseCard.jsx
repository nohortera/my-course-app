import React from 'react';
import Button from '../../../../common/Button/Button';
import './CourseCard.css';
import preformattedDuration from '../../../../helpers/pipeDuration';
import dateGenerator from '../../../../helpers/dateGenerator';

function CourseCard(props) {
	const authors = [];
	props.data.authors.forEach((id) => {
		authors.push(props.authInfo.find((author) => author.id === id).name);
	});

	return (
		<div className='course-card'>
			<div className='course-card__description'>
				<h2>{props.data.title}</h2>
				<p>{props.data.description}</p>
			</div>
			<div className='course-card__info'>
				<p>
					<strong>Authors:</strong> {authors.join(', ')}
				</p>
				<p>
					<strong>Duration:</strong> {preformattedDuration(props.data.duration)}{' '}
					hours
				</p>
				<p>
					<strong>Created:</strong> {dateGenerator(props.data.creationDate)}
				</p>
				<Button buttonText='Show course' />
			</div>
		</div>
	);
}

export default CourseCard;
