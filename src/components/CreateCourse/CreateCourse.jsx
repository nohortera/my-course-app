import React, { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Textarea from '../../common/Textarea/Textarea';
import './CreateCourse.css';
import preformattedDuration from '../../helpers/pipeDuration';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors } from '../../store/selectors';
import { createAuthor } from '../../store/authors/actionCreators';
import { createCourse } from '../../store/courses/actionCreators';

function CreateCourse() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [duration, setDuration] = useState(parseInt(''));
	const [courseAuthors, setCourseAuthors] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authors = useSelector(getAuthors);

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
		dispatch(
			createCourse({
				id: uuidv4(),
				title,
				description,
				creationDate: new Date(Date.now()).toLocaleDateString('en-GB'),
				duration,
				authors: courseAuthors,
			})
		);
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
		const check = courseAuthors.find((id) => id === author.id);
		if (check) {
			return null;
		}
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
		const author = { id: uuidv4(), name: authorName };
		dispatch(createAuthor(author));
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
				/>
				<Button buttonText='Create course' type='submit' />
			</div>
			<Textarea
				labelText='Description'
				placeholder='Enter description'
				getValue={getDescription}
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

export default CreateCourse;
