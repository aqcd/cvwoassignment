// Combines reducers in /reducers/.
// Modify when additional reducers are created.

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import todos from './todos';
import filter from './filter';
import tags from './tags';
import tagFilter from './tagFilter';
import todoFormFilter from './todoForm';

export default combineReducers({
    todos,
    filter,
    tags,
    tagFilter,
    todoFormFilter,
    form: formReducer
})