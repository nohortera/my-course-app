import React, { useContext, useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Textarea from '../../common/Textarea/Textarea';
import './CreateCourse.css';
import preformattedDuration from '../../helpers/pipeDuration';
import Context from '../../context/context';
import { v4 as uuidv4 } from 'uuid';

function CreateCourse(props) {
	const { addAuthor, addCourse } = useContext(Context);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [duration, setDuration] = useState(parseInt(''));
	const [courseAuthors, setCourseAuthors] = useState([]);

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
		addCourse({
			id: uuidv4(),
			title,
			description,
			creationDate: new Date(Date.now()).toLocaleDateString('en-GB'),
			duration,
			authors: courseAuthors,
		});
		props.renderCourses();
	}

	function addCourseAuthor(e) {
		e.preventDefault();
		const id = e.target.parentElement.id;
		// const author = props.authorsList.find((author) => author.id === id);
		setCourseAuthors(courseAuthors.concat(id));
	}

	function deleteCourseAuthor(e) {
		e.preventDefault();
		const selectedId = e.target.parentElement.id;
		setCourseAuthors(courseAuthors.filter((id) => id !== selectedId));
	}

	const allAuthors = props.authorsList.map((author, index) => {
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

	const authors = props.authorsList.map((author, index) => {
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
		addAuthor({ id: uuidv4(), name: authorName });
		setAuthorName('');
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
						modifier={authorName}
					/>
					<Button onClick={newAuthor} buttonText='Create author' />
				</div>
				<div>
					<h3>Authors</h3>
					<ul>{allAuthors}</ul>
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
					<ul>{authors}</ul>
				</div>
			</div>
		</form>
	);
}

export default CreateCourse;
