/*import { formReducer } from 'react-redux-form';
import { ActionType, ActionDispatch, OneTodoState, FormState } from '../constants';

const initialState: OneTodoState = { };

export default function todoReducer(state = initialState, action: ActionDispatch) {
    switch(action.type) {
        case ActionType.INIT_FORM:
            if(action.todoData) {
                return {
                    ...state,
                    data: action.todoData
                }
            }
        default:
            return state;
    }
}

export const loadData = (data: any) => ({ type: ActionType.INIT_FORM, data });*/