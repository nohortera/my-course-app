import React, { useContext } from 'react';
import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { logoutUser } from '../../store/user/actionCreators';

function Header() {
	const navigate = useNavigate();
	const storage = window.localStorage;
	const user = useSelector(getUser);
	const dispatch = useDispatch();

	const logout = () => {
		storage.clear();
		dispatch(logoutUser());
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
		</header>
	);
}

export default Header;
