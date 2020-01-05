import { History, LocationState } from "history";
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom";

export interface Todo {
    id: number;
    name: string;
    by: Date;
    tag: string;
    details?: string;
    completed: boolean;
}

export interface DefState {
    todo: Todo;
}

export interface DefProps {
    todoState: TodoState;
    filterState: FilterState;
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

export enum ActionType {
    INIT, GET, ADD, EDIT, DELETE, TOGGLE, FILTER, GET_FILTER
}

export enum TodosFilter {
    ALL, DONE, ACTIVE
}

export interface ActionDispatch {
  type: ActionType,
  todoData?: Todo,
  todoArray?: Todo[],
  filter?: TodosFilter
}

export interface store {

}

export interface TodoState {
    todos: Todo[]
}

export interface FilterState {
    todosFilter: TodosFilter
}

export interface CompState {
    todos: TodoState
    filter: FilterState
}