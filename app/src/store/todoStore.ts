// Constructs store based on combined reducers in /reducers/index.
// Modify when more dev tools are needed.

import reducer from '../reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const todoStore = () => {
    return createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)))
};

export default todoStore;