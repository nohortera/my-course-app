import React, { useState } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import './SearchBar.css';
import PropTypes from 'prop-types';

function SearchBar(props) {
	const [filter, setFilter] = useState('');

	function getValue(value) {
		setFilter(value);
	}

	function handleSubmit(e) {
		props.getFilter(filter);
		e.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input placeholder='Enter course name...' getValue={getValue} />
			<Button className={'mr20'} buttonText='Search' type='submit' />
		</form>
	);
}

SearchBar.propTypes = {
	getFilter: PropTypes.func.isRequired,
};

export default SearchBar;
