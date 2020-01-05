import { ActionType, ActionDispatch, FilterState, Todo, TodosFilter } from '../constants';

const initialState: FilterState = { todosFilter: TodosFilter.ALL };

export default function filterReducer(state = initialState, action: ActionDispatch) {
    switch(action.type) {
        case ActionType.GET_FILTER:
            return state;
        case ActionType.FILTER:
            console.log(state);
            if(action.filter) {
                return action.filter;
            }
        default:
            return state;
    }
}