import React, { useEffect, useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLoginUser } from '../../store/user/thunk';
import { getUser } from '../../store/selectors';

function Login() {
	const { isAuth } = useSelector(getUser);
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
			dispatch(thunkLoginUser({ email, password }));
			navigate('/courses', { replace: true });
		} catch (e) {
			setIsError(true);
			console.error(e);
		}
	}

	useEffect(() => {
		if (isAuth) navigate('/courses', { replace: true });
	}, [isAuth]);

	useEffect(() => {
		console.log('render login');
	}, []);

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
						required={true}
					/>
					<Input
						className='login-form__field'
						type='password'
						placeholder='Enter password'
						labelText='Password'
						getValue={getPassword}
						required={true}
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
