import React, { useState, useEffect } from 'react';
import './Textarea.css';
import PropTypes from 'prop-types';

function Textarea(props) {
	const [value, setValue] = useState(props.value ? props.value : '');

	function handleChange(e) {
		setValue(e.target.value);
	}

	useEffect(() => {
		props.getValue(value);
	}, [value]);

	return (
		<label className='textarea-label'>
			{props.labelText}
			<textarea
				className='textarea'
				placeholder={props.placeholder}
				value={value}
				onChange={handleChange}
			/>
		</label>
	);
}

Textarea.propTupes = {
	labelText: PropTypes.string,
	placeholder: PropTypes.string,
	getValue: PropTypes.func,
};

export default Textarea;
