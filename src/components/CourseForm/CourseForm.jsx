import React, { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Textarea from '../../common/Textarea/Textarea';
import './CourseForm.css';
import preformattedDuration from '../../helpers/pipeDuration';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAddCourse, thunkUpdateCourse } from '../../store/courses/thunk';
import { thunkAddAuthor } from '../../store/authors/thunk';

function CourseForm() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [duration, setDuration] = useState(parseInt(''));
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { authors, courses } = useSelector((state) => state);
	const location = useLocation();
	const { id } = useParams();
	const course = courses.find((course) => course.id === id);
	const [courseAuthors, setCourseAuthors] = useState(
		course ? course.authors : []
	);

	function getTitle(value) {
		setTitle(value);
	}

	function getDescription(value) {
		setDescription(value);
	}

	function getAuthorName(value) {
		setAuthorName(value);
	}

	function getDuration(value) {
		setDuration(parseInt(value));
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!(title && description && duration && courseAuthors.length)) {
			return alert('Please, fill in all fields');
		}
		if (location.pathname.startsWith('/courses/update')) {
			dispatch(
				thunkUpdateCourse(id, {
					title,
					description,
					duration,
					authors: courseAuthors,
				})
			);
		} else {
			dispatch(
				thunkAddCourse({
					title,
					description,
					duration,
					authors: courseAuthors,
				})
			);
		}
		navigate('/courses');
	}

	function addCourseAuthor(e) {
		e.preventDefault();
		const id = e.target.parentElement.id;
		setCourseAuthors(courseAuthors.concat(id));
	}

	function deleteCourseAuthor(e) {
		e.preventDefault();
		const selectedId = e.target.parentElement.id;
		setCourseAuthors(courseAuthors.filter((id) => id !== selectedId));
	}

	const allAuthorsList = authors.map((author, index) => {
		if (courseAuthors.includes(author.id)) return null;
		return (
			<li id={author.id} key={index} className='author'>
				{author.name}
				<Button buttonText='Add author' onClick={addCourseAuthor} />
			</li>
		);
	});

	const courseAuthorsList = authors.map((author, index) => {
		if (!courseAuthors.includes(author.id)) return null;
		return (
			<li id={author.id} key={index} className='author'>
				{author.name}
				<Button buttonText='Delete author' onClick={deleteCourseAuthor} />
			</li>
		);
	});

	function newAuthor(e) {
		e.preventDefault();
		if (authorName === '') return alert('Please, fill in author name');
		if (authors.find((e) => e.name === authorName)) {
			return alert('Author already exists');
		}
		dispatch(thunkAddAuthor({ name: authorName }));
	}

	return (
		<form className='create-form' onSubmit={handleSubmit}>
			<div className='create-form__head'>
				<Input
					className='course-card__input'
					type='text'
					labelText='Title'
					placeholder='Enter title...'
					getValue={getTitle}
					value={
						location.pathname.startsWith('/courses/update') && course
							? course.title
							: null
					}
				/>
				<Button
					buttonText={
						location.pathname.startsWith('/courses/update')
							? 'Update course'
							: 'Create course'
					}
					type='submit'
				/>
			</div>
			<Textarea
				labelText='Description'
				placeholder='Enter description'
				getValue={getDescription}
				value={
					location.pathname.startsWith('/courses/update') && course
						? course.description
						: null
				}
			/>
			<div className='create-form__authors'>
				<div>
					<h3>Add author</h3>
					<Input
						className='course-card__input'
						type='text'
						labelText='Author Name'
						placeholder='Enter author name...'
						getValue={getAuthorName}
					/>
					<Button onClick={newAuthor} buttonText='Create author' />
				</div>
				<div>
					<h3>Authors</h3>
					<ul>{allAuthorsList}</ul>
				</div>
				<div>
					<h3>Duration</h3>
					<Input
						className='course-card__input'
						type='number'
						labelText='Duration'
						placeholder='Enter duration in minutes...'
						getValue={getDuration}
						value={
							location.pathname.startsWith('/courses/update') && course
								? course.duration
								: null
						}
					/>
					<p>
						Duration:{' '}
						<span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
							{isNaN(duration) ? '00:00' : preformattedDuration(duration)}
						</span>{' '}
						hours
					</p>
				</div>
				<div>
					<h3>Course authors</h3>
					<ul>{courseAuthorsList}</ul>
				</div>
			</div>
		</form>
	);
}

export default CourseForm;
