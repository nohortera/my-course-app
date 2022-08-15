import { LOGIN, LOGOUT } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: null,
	email: null,
	token: null,
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
				isAuth: true,
			};
		case LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
};
