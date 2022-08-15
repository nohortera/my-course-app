import { LOGIN, LOGOUT, REGISTER } from './actionTypes';

export const loginUser = (user) => ({
	type: LOGIN,
	payload: user,
});

export const logoutUser = () => ({
	type: LOGOUT,
});

export const register = () => ({
	type: REGISTER,
});
