import { checkAuthReq, loginReq, logoutReq } from '../services';
import { loginUser, logoutUser } from './actionCreators';

export const thunkLoginUser = (credentials) => async (dispatch) => {
	let response;

	try {
		response = await loginReq(credentials);
	} catch (e) {
		console.log(e);
	}

	const token = await response.data.result;
	try {
		response = await checkAuthReq(token);
	} catch (e) {
		console.log(e);
	}

	dispatch(
		loginUser({
			name: response.data.result.name,
			email: response.data.result.email,
			token,
			role: response.data.result.role,
		})
	);
	const storage = window.localStorage;
	storage.setItem('token', await token);
	storage.setItem('user', response.data.result.name);
	storage.setItem('email', response.data.result.email);
	storage.setItem('role', response.data.result.role);
};

export const thunkLogoutUser = () => async (dispatch, getState) => {
	const state = getState();

	try {
		await logoutReq(state.user.token);
	} catch (e) {
		console.log(e);
	}

	dispatch(logoutUser());
	window.localStorage.clear();
};

export const thunkCheckCurrentUser = () => async (dispatch, getState) => {
	const state = getState();
	let token;
	state.user.token
		? (token = state.user.token)
		: (token = window.localStorage.getItem('token'));
	let response;

	try {
		response = await checkAuthReq(token);
	} catch (e) {
		console.log(e);
		dispatch(logoutUser());
		window.localStorage.clear();
	}

	dispatch(
		loginUser({
			name: response.data.result.name,
			email: response.data.result.email,
			token,
			role: response.data.result.role,
		})
	);
};
