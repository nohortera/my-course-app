import React, { useEffect, useState } from 'react';
import './Input.css';
import PropTypes from 'prop-types';

function Input(props) {
	const [value, setValue] = useState(props.value ? props.value : '');

	function handleChange(e) {
		setValue(e.target.value);
	}

	useEffect(() => {
		props.getValue(value);
	}, [value]);

	return (
		<label className={props.className}>
			{props.labelText}
			<input
				required={props.required}
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
	required: PropTypes.bool,
};

Input.defaultProps = {
	type: 'text',
};

export default Input;
