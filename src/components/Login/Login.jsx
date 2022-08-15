import React, { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/user/actionCreators';
import { loginReq } from '../../store/services';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isError, setIsError] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
			const response = await loginReq(email, password);
			if (response.status < 400) {
				dispatch(
					loginUser({
						name: response.data.user.name,
						email: email,
						token: response.data.result,
					})
				);
				const storage = window.localStorage;
				const accessKey = await response.data.result.split(' ')[1];
				storage.setItem('Bearer', await accessKey);
				storage.setItem('user', response.data.user.name);
				storage.setItem('email', email);
				navigate('/courses');
			} else {
				throw new Error(response.status.toString());
			}
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
