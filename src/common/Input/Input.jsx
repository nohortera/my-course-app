import React, { useEffect, useState } from 'react';
import './Input.css';
import PropTypes from 'prop-types';

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

Input.propTypes = {
	type: PropTypes.oneOf([
		'button',
		'checkbox',
		'color',
		'date',
		'datetime',
		'datetime-local',
		'email',
		'file',
		'hidden',
		'image',
		'month',
		'number',
		'password',
		'radio',
		'range',
		'reset',
		'search',
		'submit',
		'tel',
		'text',
		'time',
		'url',
		'week',
	]),
	placeholder: PropTypes.string,
	getValue: PropTypes.func,
	labelText: PropTypes.string,
	className: PropTypes.string,
};

Input.defaultProps = {
	type: 'text',
};

export default Input;
