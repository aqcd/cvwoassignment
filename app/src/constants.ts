// Application Constants.

import { History, LocationState } from "history";
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom";

export interface Todo {
    id: number;
    name: string;
    by: Date;
    tag_list: string | string[];
    details?: string;
    completed: boolean;
}

export interface Tag {
    id: number;
    name: string;
    taggings_count: number;
}

export interface EmptyState {
}

export interface DefState {
    todo: Todo;
}

export interface DefProps {
    todoState: TodoState;
    formState: FormState;
    filterState: FilterState;
    tagState: TagState;
    tagFilterState: TagFilterState;
    dispatch: Function;
    history: History<LocationState>;
}

interface MatchParams {
    id?: string;
}

export interface MatchProps extends RouteComponentProps<MatchParams> {
    todoState: TodoState;
    filterState: FilterState;
    dispatch: Function;
    history: History<LocationState>;
}

export interface TagOption {
    value: string;
    label: string;
}

export enum ActionType {
    INIT, GET, ADD, EDIT, DELETE, TOGGLE, FILTER, GET_FILTER, TAG_FILTER, GET_TAG_FILTER, INIT_TAGS, GET_TAGS
}

export enum TodosFilter {
    ALL, DONE, ACTIVE
}

export interface ActionDispatch {
  type: ActionType,
  todoData?: Todo,
  todoArray?: Todo[],
  filter?: TodosFilter,
  tagFilter?: TagOption,
  tagArray?: Tag[]
}

export interface TodoState {
    todos: Todo[]
}

export interface FormState {
    name: string;
    by: Date;
    tag_list: string | string[];
    details?: string;
}

export interface FilterState {
    todosFilter: TodosFilter
}

export interface TagState {
    tags: Tag[]
}

export interface TagFilterState {
    tagOption: TagOption
}

export interface CompState {
    todos: TodoState
    form: FormState
    filter: FilterState
    tags: TagState
    tagFilter: TagFilterState
}