import React, { useState, useEffect } from 'react';
import './Textarea.css';

function Textarea(props) {
	const [value, setValue] = useState('');

	function handleChange(e) {
		setValue(e.target.value);
	}

	useEffect(() => {
		props.getValue(value);
	});

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

export default Textarea;
