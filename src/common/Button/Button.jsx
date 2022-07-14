import React from 'react';
import './Button.css';

function Button(props) {
	return (
		<button
			className={props.className}
			type={props.type}
			onClick={props.onClick}
		>
			{props.buttonText}
		</button>
	);
}

export default Button;
