import { ActionType, ActionDispatch, AppState, Todo, TodosFilter } from '../constants';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState: AppState = { todos: [] };

function rootReducer(state = initialState, action: ActionDispatch) {
    switch(action.type) {
        case ActionType.INIT:
            if(action.todoArray) {
                return {
                    ...state,
                    todos: action.todoArray
                };
            }
            return state;
        case ActionType.GET:
            return state;
        case ActionType.ADD:
            if(action.todoData) {
                return {
                    ...state,
                    todos: [...state.todos, action.todoData]
                };
            }
            return state;
        case ActionType.EDIT:
            if(action.todoData) {
                const index = state.todos.findIndex(todo => todo.id === action.todoData!.id);
                return {
                    ...state,
                    todos: [...state.todos.slice(0, index), action.todoData, ...state.todos.slice(index + 1)]
                };
            }
            return state;
        case ActionType.DELETE:
            if(action.todoData) {
                const index = state.todos.findIndex(todo => todo.id === action.todoData!.id);
                return {
                    ...state,
                    todos: [...state.todos.slice(0, index), ...state.todos.slice(index + 1)]
                };
            }
            return state;
        case ActionType.TOGGLE:
            if(action.todoData) {
                const index = state.todos.findIndex(todo => todo.id === action.todoData!.id);
                return {
                    ...state,
                    todos: [...state.todos.slice(0, index),
                    {
                        ...state.todos[index],
                        completed: action.todoData.completed ? false : true
                    },
                    ...state.todos.slice(index + 1)]
                };
            }
            return state;
        default:
            return state;
    }
}

const todoStore = () => {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
};

export default todoStore;