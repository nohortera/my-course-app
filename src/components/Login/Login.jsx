import React, { Fragment, useContext, useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import './Login.css';
import axios from 'axios';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { authCheck } = useContext(Context);
	const [isError, setIsError] = useState(false);
	const navigate = useNavigate();

	function getEmail(value) {
		setEmail(value);
	}

	function getPassword(value) {
		setPassword(value);
	}

	async function login(e) {
		e.preventDefault();
		setIsError(false);
		try {
			const response = await axios.post('http://localhost:4000/login', {
				email,
				password,
			});
			const storage = window.localStorage;
			const accessKey = response.data.result.split(' ')[1];
			storage.setItem('Bearer', accessKey);
			storage.setItem('user', response.data.user.name);
			authCheck();
			navigate('/courses');
		} catch (e) {
			setIsError(true);
			console.error(e);
		}
	}

	return (
		<>
			{isError && <p className='error'>Something went wrong...</p>}
			<div className='login-wrapper'>
				<h2>Login</h2>
				<form className='login-form' onSubmit={login}>
					<Input
						className={'login-form__field'}
						type='text'
						placeholder='Enter email'
						labelText='Email'
						getValue={getEmail}
					/>
					<Input
						className='login-form__field'
						type='password'
						placeholder='Enter password'
						labelText='Password'
						getValue={getPassword}
					/>
					<Button
						className='login-form__button'
						type='submit'
						buttonText='Login'
					/>
				</form>
				<span>
					If you do not have an account you can pass{' '}
					<Link to='/registration'>Registration</Link>
				</span>
			</div>
		</>
	);
}

export default Login;
