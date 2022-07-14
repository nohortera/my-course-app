import React, { useEffect, useState } from 'react';
import './Input.css';

function Input(props) {
	const [value, setValue] = useState('');

	function handleChange(e) {
		setValue(e.target.value);
	}

	useEffect(() => {
		props.getValue(value);
	});

	return (
		<label className={props.className}>
			{props.labelText}
			<input
				type={props.type}
				value={value}
				placeholder={props.placeholder}
				onChange={handleChange}
			/>
		</label>
	);
}

export default Input;
