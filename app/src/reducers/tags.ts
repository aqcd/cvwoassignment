// Reducer for tags. Current supports initialisation and getter.
// Modify when more action types are needed.

import { ActionType, ActionDispatch, Tag, TagState } from '../constants';

const initialState: TagState = { tags: [] };

export default function tagReducer(state = initialState, action: ActionDispatch) {
    switch(action.type) {
        case ActionType.INIT_TAGS:
            if(action.tagArray) {
                return {
                    ...state,
                    tags: [{ name:"-All-" }, ...action.tagArray]
                };
            }
        case ActionType.GET_TAGS:
            return state
        default:
            return state;
    }
}