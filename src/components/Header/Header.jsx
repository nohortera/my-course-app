import React, { useContext } from 'react';
import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../context/context';

function Header() {
	const navigate = useNavigate();
	const { authCheck, isAuth } = useContext(Context);
	const storage = window.localStorage;

	const logout = () => {
		storage.clear();
		authCheck();
		navigate('/login');
	};

	return (
		<header>
			<Link to='/courses'>
				<Logo />
			</Link>
			{isAuth && (
				<div>
					<span>{storage.getItem('user')}</span>
					<Button className='mr20' buttonText='Logout' onClick={logout} />
				</div>
			)}
		</header>
	);
}

export default Header;
