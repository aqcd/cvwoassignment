// Reducer for tag filter. Current supports initialisation and toggling.
// Modify when more action types are needed.

import { ActionType, ActionDispatch, Tag, TagOption, TagFilterState } from '../constants';

const initialState: TagFilterState = { tagOption: { value:"", label:"Search by Tag" } };

export default function tagFilterReducer(state = initialState, action: ActionDispatch) {
    switch(action.type) {
        case ActionType.GET_TAG_FILTER:
            return state;
        case ActionType.TAG_FILTER:
            if(action.tagFilter) {
                return action.tagFilter;
            }
        default:
            return state;
    }
}