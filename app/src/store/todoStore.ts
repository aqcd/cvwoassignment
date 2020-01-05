import reducer from '../reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const todoStore = () => {
    return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
};

export default todoStore;