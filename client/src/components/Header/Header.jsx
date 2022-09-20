import React from 'react';
import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { thunkLogoutUser } from '../../store/user/thunk';

function Header() {
	const navigate = useNavigate();
	const user = useSelector(getUser);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(thunkLogoutUser());
		navigate('/login');
	};

	return (
		<header>
			<Link to='/courses'>
				<Logo />
			</Link>
			{user.isAuth && (
				<div>
					<span>{user.name}</span>
					<Button className='mr20' buttonText='Logout' onClick={logout} />
				</div>
			)}
			{/*{user.isAuth ? (*/}
			{/*	<div>*/}
			{/*		<span>{user.name}</span>*/}
			{/*		<Button className='mr20' buttonText='Logout' onClick={logout} />*/}
			{/*	</div>*/}
			{/*) : (*/}
			{/*	<div>*/}
			{/*		<Button buttonText='Login' onClick={() => navigate('/login')} />*/}
			{/*		<Button*/}
			{/*			className='mr20'*/}
			{/*			buttonText='Register'*/}
			{/*			onClick={() => navigate('/registration')}*/}
			{/*		/>*/}
			{/*	</div>*/}
			{/*)}*/}
		</header>
	);
}

export default Header;
