import React from 'react';
import Button from '../../../../common/Button/Button';
import './CourseCard.css';
import preformattedDuration from '../../../../helpers/pipeDuration';
import dateGenerator from '../../../../helpers/dateGenerator';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { pencilSVG, crossSVG } from '../../../../images/svgs';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getUser } from '../../../../store/selectors';
import { ADMIN } from '../../../../store/user/roles';
import { thunkDeleteCourse } from '../../../../store/courses/thunk';

function CourseCard(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authors = useSelector(getAuthors);
	const { role } = useSelector(getUser);
	const courseAuthors = [];
	props.data.authors.forEach((id) => {
		courseAuthors.push(authors.find((author) => author.id === id).name);
	});

	return (
		<div className='course-card'>
			<div className='course-card__description'>
				<h2>{props.data.title}</h2>
				<p>{props.data.description}</p>
			</div>
			<div className='course-card__info'>
				<p>
					<strong>Authors:</strong> {courseAuthors.join(', ')}
				</p>
				<p>
					<strong>Duration:</strong> {preformattedDuration(props.data.duration)}{' '}
					hours
				</p>
				<p>
					<strong>Created:</strong> {dateGenerator(props.data.creationDate)}
				</p>
				<div className='course-card__buttons'>
					<Button
						buttonText='Show course'
						onClick={() => navigate(`/courses/${props.data.id}`)}
					/>
					{role === ADMIN && (
						<>
							<Button
								buttonText={pencilSVG}
								width='40px'
								onClick={() => navigate(`/courses/update/${props.data.id}`)}
							/>
							<Button
								buttonText={crossSVG}
								width='40px'
								onClick={() => dispatch(thunkDeleteCourse(props.data.id))}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

CourseCard.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		creationDate: PropTypes.string,
		duration: PropTypes.number,
		authors: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

export default CourseCard;
