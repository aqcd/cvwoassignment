// Combines reducers in /reducers/.
// Modify when additional reducers are created.

import { combineReducers } from 'redux';
import todos from './todos';
import filter from './filter';

export default combineReducers({
    todos,
    filter
})