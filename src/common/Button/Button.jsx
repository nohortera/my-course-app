import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

function Button(props) {
	return (
		<button
			className={props.className}
			type={props.type}
			onClick={props.onClick}
			style={{ width: props.width }}
		>
			{props.buttonText}
		</button>
	);
}

Button.propTypes = {
	buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
		.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['submit', 'reset', 'button']),
};

Button.defaultProps = {
	type: 'submit',
};

export default Button;
