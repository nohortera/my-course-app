import React from 'react';
import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';

function Header() {
	return (
		<header>
			<Logo />
			<div>
				<span>Maks</span>
				<Button className={'mr20'} buttonText={'Logout'} />
			</div>
		</header>
	);
}

export default Header;
