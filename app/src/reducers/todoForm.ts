import { formReducer } from 'react-redux-form';
import { FormState } from '../constants';

const initialTodo: FormState = { name: "", by: new Date(), tag_list: "" };

const todoFormReducer = formReducer('todo', initialTodo);

export default todoFormReducer;