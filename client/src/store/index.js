import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { userReducer } from './user/reducer';
import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
