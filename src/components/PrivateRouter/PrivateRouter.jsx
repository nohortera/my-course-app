import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { ADMIN } from '../../store/user/roles';
import { thunkCheckCurrentUser } from '../../store/user/thunk';

export const PrivateRouter = ({ children }) => {
	const dispatch = useDispatch();
	const { role } = useSelector(getUser);

	useEffect(() => {
		dispatch(thunkCheckCurrentUser());
	}, []);

	return role === ADMIN ? children : <Navigate to='/courses' replace={true} />;
};
