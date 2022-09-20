import React, { useState, useEffect } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';
import { registrationReq } from '../../store/services';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';

function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isError, setIsError] = useState(false);
	const { isAuth } = useSelector(getUser);
	const navigate = useNavigate();

	function getName(value) {
		setName(value);
	}

	function getEmail(value) {
		setEmail(value);
	}

	function getPassword(value) {
		setPassword(value);
	}

	const registerUser = async (e) => {
		setIsError(false);
		e.preventDefault();
		try {
			const response = await registrationReq(name, email, password);
			if (!isError && response.data.successful) navigate('/login');
		} catch (e) {
			setIsError(true);
			console.error(e);
		}
	};

	useEffect(() => {
		if (isAuth) navigate('/courses', { replace: true });
	}, [isAuth]);

	useEffect(() => {
		console.log('render registration');
	}, []);

	return (
		<>
			{isError && <p className='error'>Something went wrong...</p>}
			<div className='registration-wrapper'>
				<h2>Registration</h2>
				<form className='registration-form' onSubmit={registerUser}>
					<Input
						className='registration-form__field'
						type='text'
						placeholder='Enter name'
						labelText='Name'
						getValue={getName}
					/>
					<Input
						className='registration-form__field'
						type='text'
						placeholder='Enter email'
						labelText='Email'
						getValue={getEmail}
					/>
					<Input
						className='registration-form__field'
						type='password'
						placeholder='Enter password'
						labelText='Password'
						getValue={getPassword}
					/>
					<Button
						className='registration-form__button'
						type='submit'
						buttonText='Registration'
					/>
				</form>
				<span>
					If you have an account you can <Link to='/login'>Login</Link>
				</span>
			</div>
		</>
	);
}

export default Registration;
